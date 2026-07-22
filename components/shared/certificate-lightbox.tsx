"use client";

import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type CertificateLightboxProps = {
  thumbSrc: string;
  fullSrc: string;
  alt: string;
  openLabel: string;
  closeLabel: string;
};

export function CertificateLightbox({
  thumbSrc,
  fullSrc,
  alt,
  openLabel,
  closeLabel,
}: CertificateLightboxProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label={openLabel}
        className="group/cert relative block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-brand/40 hover:shadow-md focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
      >
        <Image
          src={thumbSrc}
          alt={alt}
          width={640}
          height={452}
          className="h-auto w-full"
          sizes="(min-width: 1024px) 28rem, 100vw"
        />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs" />
        <Dialog.Popup className="fixed inset-0 z-50 flex items-center justify-center p-4 transition duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 sm:p-8">
          <div className="relative flex max-h-[90vh] max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-popover shadow-lg">
            <Image
              src={fullSrc}
              alt={alt}
              width={1600}
              height={1131}
              className="h-auto max-h-[90vh] w-full object-contain"
              sizes="(min-width: 1024px) 64rem, 100vw"
            />
            <Dialog.Close
              aria-label={closeLabel}
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="absolute top-3 right-3 bg-popover/80 backdrop-blur-sm"
                />
              }
            >
              <XIcon aria-hidden />
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
