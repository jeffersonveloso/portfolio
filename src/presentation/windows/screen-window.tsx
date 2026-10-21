"use client";

import Image from "next/image";
import { useId, useRef, type ReactNode } from "react";
import { Close, Expand } from "@/presentation/icons";
import type { Screenshot } from "@/domain/portfolio/media";

const frame = "overflow-hidden rounded-[10px] bg-[#1e1e20] shadow-product ring-1 ring-black/40";
const control = "ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] leading-none text-[#c7c7cc]";

// The code window's macOS title bar, with a toolbar control on the right.
function TitleBar({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="relative flex h-[38px] items-center border-b border-black/60 bg-[#2c2c2e] px-3.5">
      <div aria-hidden="true" className="flex gap-2">
        <span className="traffic bg-[#ff5f57]" />
        <span className="traffic bg-[#febc2e]" />
        <span className="traffic bg-[#28c840]" />
      </div>
      <p className="pointer-events-none absolute inset-x-0 text-center text-[13px] text-[#a1a1a6]">{title}</p>
      {children}
    </div>
  );
}

// A product screenshot in a macOS window. The whole window opens it full
// size in a modal dialog: Esc, the Close control or a click outside closes
// it, and focus returns to the window.
export function ScreenWindow({ screen, sizes, className }: { screen: Screenshot; sizes: string; className: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const imageId = useId();

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`Expand screenshot: ${screen.title}`}
        aria-describedby={imageId}
        onClick={() => dialog.current?.showModal()}
        className={`group block w-full cursor-zoom-in text-left ${frame} ${className}`}
      >
        <TitleBar title={screen.title}>
          <span aria-hidden="true" className={`${control} relative group-hover:bg-white/10`}>
            <Expand width="12" height="12" />
            Expand
          </span>
        </TitleBar>
        <Image
          id={imageId}
          src={screen.src}
          width={screen.width}
          height={screen.height}
          alt={screen.alt}
          sizes={sizes}
          className="block h-auto w-full"
        />
      </button>

      <dialog
        ref={dialog}
        aria-label={screen.title}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        className="shot-dialog m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0"
      >
        <div className={frame}>
          <TitleBar title={screen.title}>
            <button
              type="button"
              autoFocus
              onClick={() => dialog.current?.close()}
              className={`${control} relative hover:bg-white/10`}
            >
              <Close width="12" height="12" />
              Close
            </button>
          </TitleBar>
          {/* Full size, unprocessed, so the interface text stays sharp. From
              768px it fits the screen; on phones it opens at a readable 1000px
              and pans inside the window. */}
          <div className="max-h-[calc(100dvh-4rem-38px)] max-w-[calc(100vw-2rem)] overflow-auto overscroll-contain">
            <Image
              src={screen.src}
              width={screen.width}
              height={screen.height}
              alt={screen.alt}
              unoptimized
              className="block h-auto w-[1000px] max-w-none md:max-h-[calc(100dvh-4rem-38px)] md:w-auto md:max-w-[calc(100vw-2rem)]"
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
