"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { ChangeEvent, CSSProperties } from "react";
import type { VideoMeta } from "@/data/portfolio";

type ProjectVideoProps = {
  landscape: VideoMeta;
  portrait: VideoMeta;
  ariaLabel: string;
  className?: string;
};

export const ProjectVideo = forwardRef<HTMLVideoElement, ProjectVideoProps>(
  function ProjectVideo(
    { landscape, portrait, ariaLabel, className },
    forwardedRef,
  ) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const lastSrcRef = useRef<string | null>(null);
    const inViewRef = useRef(false);
    const reducedMotionRef = useRef(false);
    const [isMobile, setIsMobile] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [inView, setInView] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useImperativeHandle(
      forwardedRef,
      () => videoRef.current as HTMLVideoElement,
      [],
    );

    const formatTime = (value: number) => {
      if (!Number.isFinite(value) || value < 0) return "0:00";

      const totalSeconds = Math.floor(value);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const paddedSeconds = seconds.toString().padStart(2, "0");

      return hours > 0
        ? `${hours}:${minutes.toString().padStart(2, "0")}:${paddedSeconds}`
        : `${minutes}:${paddedSeconds}`;
    };

    const togglePlayback = () => {
      const video = videoRef.current;
      if (!video) return;

      if (video.paused || video.ended) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    const toggleMuted = () => {
      const video = videoRef.current;
      if (!video) return;

      const nextMuted = !video.muted;
      video.muted = nextMuted;
      setIsMuted(nextMuted);
    };

    const toggleFullscreen = async () => {
      const container = containerRef.current;
      if (!container) return;

      try {
        if (!document.fullscreenElement) {
          await container.requestFullscreen();
        } else {
          await document.exitFullscreen();
        }
      } catch {
        setIsFullscreen(Boolean(document.fullscreenElement));
      }
    };

    const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
      const video = videoRef.current;
      if (!video) return;

      const nextTime = Number(event.currentTarget.value);
      video.currentTime = nextTime;
      setCurrentTime(nextTime);
    };

    useEffect(() => {
      if (typeof window === "undefined" || !videoRef.current) return;

      const video = videoRef.current;
      const mediaQuery = window.matchMedia("(max-width: 767px)");
      const reducedMotionQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      const updateMotionPreference = () => {
        const reduced = reducedMotionQuery.matches;
        reducedMotionRef.current = reduced;
        setPrefersReducedMotion(reduced);
        if (reduced) video.pause();
      };

      const loadSource = (mobile: boolean, preservePosition: boolean) => {
        const source = mobile ? portrait : landscape;
        if (lastSrcRef.current === source.src) {
          if (source.poster) video.poster = source.poster;
          return;
        }

        const currentTime = preservePosition ? video.currentTime : 0;
        const wasPlaying = preservePosition && !video.paused && !video.ended;
        lastSrcRef.current = source.src;
        if (source.poster) {
          video.poster = source.poster;
        } else {
          video.removeAttribute("poster");
        }
        video.src = source.src;
        video.load();

        if (preservePosition && currentTime > 0) {
          const restorePosition = () => {
            if (Number.isFinite(video.duration)) {
              video.currentTime = Math.min(
                currentTime,
                Math.max(0, video.duration - 0.1),
              );
            }
            if (
              wasPlaying &&
              inViewRef.current &&
              !reducedMotionRef.current
            ) {
              void video.play().catch(() => undefined);
            }
          };
          video.addEventListener("loadedmetadata", restorePosition, {
            once: true,
          });
        } else if (inViewRef.current && !reducedMotionRef.current) {
          void video.play().catch(() => undefined);
        }
      };

      const updateSource = () => {
        const mobile = mediaQuery.matches;
        setIsMobile(mobile);
        loadSource(mobile, lastSrcRef.current !== null);
      };

      updateMotionPreference();
      updateSource();

      const handleMediaChange = () => {
        updateMotionPreference();
        updateSource();
      };

      mediaQuery.addEventListener("change", handleMediaChange);
      reducedMotionQuery.addEventListener("change", updateMotionPreference);

      return () => {
        mediaQuery.removeEventListener("change", handleMediaChange);
        reducedMotionQuery.removeEventListener("change", updateMotionPreference);
      };
    }, [landscape, portrait]);

    useEffect(() => {
      if (typeof window === "undefined" || !videoRef.current) return;

      const video = videoRef.current;
      const container = containerRef.current;
      const syncPlaybackState = () => {
        setIsPlaying(!video.paused && !video.ended);
      };
      const syncTimeState = () => {
        setCurrentTime(video.currentTime);
      };
      const syncDurationState = () => {
        setDuration(Number.isFinite(video.duration) ? video.duration : 0);
      };
      const syncMutedState = () => {
        setIsMuted(video.muted);
      };
      const syncFullscreenState = () => {
        setIsFullscreen(document.fullscreenElement === container);
      };

      video.addEventListener("play", syncPlaybackState);
      video.addEventListener("pause", syncPlaybackState);
      video.addEventListener("ended", syncPlaybackState);
      video.addEventListener("timeupdate", syncTimeState);
      video.addEventListener("loadedmetadata", syncDurationState);
      video.addEventListener("durationchange", syncDurationState);
      video.addEventListener("volumechange", syncMutedState);
      document.addEventListener("fullscreenchange", syncFullscreenState);

      syncPlaybackState();
      syncTimeState();
      syncDurationState();
      syncMutedState();
      syncFullscreenState();

      return () => {
        video.removeEventListener("play", syncPlaybackState);
        video.removeEventListener("pause", syncPlaybackState);
        video.removeEventListener("ended", syncPlaybackState);
        video.removeEventListener("timeupdate", syncTimeState);
        video.removeEventListener("loadedmetadata", syncDurationState);
        video.removeEventListener("durationchange", syncDurationState);
        video.removeEventListener("volumechange", syncMutedState);
        document.removeEventListener("fullscreenchange", syncFullscreenState);
      };
    }, []);

    useEffect(() => {
      if (typeof window === "undefined" || !videoRef.current) return;

      const video = videoRef.current;
      const observer = new IntersectionObserver(
        ([entry]) => {
          const visible = entry.isIntersecting;
          inViewRef.current = visible;
          setInView(visible);
          if (visible && !reducedMotionRef.current) {
            void video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        },
        { rootMargin: "200px", threshold: 0.5 },
      );

      observer.observe(video);
      return () => {
        observer.disconnect();
        video.pause();
      };
    }, []);

    const progressPercent =
      duration > 0 && Number.isFinite(currentTime)
        ? Math.min(100, Math.max(0, (currentTime / duration) * 100))
        : 0;
    const progressStyle: CSSProperties & { "--progress": string } = {
      "--progress": `${progressPercent}%`,
    };

    return (
      <div
        ref={containerRef}
        className={`video-shell relative aspect-[9/16] overflow-hidden rounded-md border border-line/25 bg-bg shadow-2xl transition-shadow duration-500 md:aspect-[16/9] ${className ?? ""}`}
        data-mobile={isMobile ? "true" : "false"}
        data-in-view={inView ? "true" : "false"}
        data-reduced-motion={prefersReducedMotion ? "true" : "false"}
        data-playing={isPlaying ? "true" : "false"}
      >
        <video
          ref={videoRef}
          className="h-full w-full           object-contain bg-bg"
          poster={landscape.poster}
          muted
          playsInline
          loop
          preload="metadata"
          aria-label={ariaLabel}
          controlsList="nodownload nofullscreen nopip"
          disablePictureInPicture
          disableRemotePlayback
          onContextMenu={(event) => event.preventDefault()}
          onClick={togglePlayback}
        />

        <div className="video-controls absolute inset-x-0 bottom-0 z-10 px-3 pb-3 pt-8 sm:px-4 sm:pb-4 sm:pt-12" role="group" aria-label={`${ariaLabel} controls`}>
          <input
            className="video-progress"
            style={progressStyle}
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            onChange={handleSeek}
            aria-label="Seek video"
            aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
          />
          <div className="mt-2 flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="video-control-button"
              onClick={togglePlayback}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.14v13.72a1 1 0 0 0 1.52.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
                </svg>
              )}
            </button>

            <span className="video-time text-xs font-medium tabular-nums text-text/90">
              {formatTime(currentTime)} <span className="text-white/60">/ {formatTime(duration)}</span>
            </span>

            <span className="flex-1" aria-hidden="true" />

            <button
              type="button"
              className="video-control-button"
              onClick={toggleMuted}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              aria-pressed={!isMuted}
            >
              {isMuted ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 5 6.5 9H3v6h3.5L11 19V5ZM22 9l-6 6M16 9l6 6" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 5 6.5 9H3v6h3.5L11 19V5ZM15.5 9.5a4 4 0 0 1 0 5M18.5 7a8 8 0 0 1 0 10" />
                </svg>
              )}
            </button>

            <button
              type="button"
              className="video-control-button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              aria-pressed={isFullscreen}
            >
              {isFullscreen ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <noscript>
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-bg/90 p-6 text-center">
            <a
              href={landscape.src}
              className="font-medium text-accent underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Landscape MP4
            </a>
            <a
              href={portrait.src}
              className="font-medium text-accent underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Portrait MP4
            </a>
          </div>
        </noscript>
      </div>
    );
  },
);
