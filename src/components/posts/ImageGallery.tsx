'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface ImageGalleryProps {
    images: string[]
    title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const openLightbox = (index: number) => {
        setSelectedIndex(index)
    }

    const closeLightbox = () => {
        setSelectedIndex(null)
    }

    const goToPrevious = () => {
        if (selectedIndex !== null) {
            setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1)
        }
    }

    const goToNext = () => {
        if (selectedIndex !== null) {
            setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1)
        }
    }

    if (images.length === 0) {
        return null
    }

    return (
        <>
            <div className={cn(
                'grid gap-4',
                images.length === 1 && 'grid-cols-1',
                images.length === 2 && 'grid-cols-2',
                images.length >= 3 && 'grid-cols-2 md:grid-cols-3'
            )}>
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => openLightbox(index)}
                        className={cn(
                            'group relative aspect-square overflow-hidden rounded-lg bg-muted',
                            images.length === 1 && 'aspect-video',
                            index === 0 && images.length === 3 && 'col-span-2 md:col-span-1 aspect-video md:aspect-square'
                        )}
                    >
                        <Image
                            src={image}
                            alt={`${title} - ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </button>
                ))}
            </div>

            <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
                <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 border-0 bg-transparent">
                    <div className="relative flex items-center justify-center">
                        {selectedIndex !== null && (
                            <Image
                                src={images[selectedIndex]}
                                alt={`${title} - ${selectedIndex + 1}`}
                                width={1200}
                                height={800}
                                className="max-h-[85vh] w-auto object-contain rounded-lg"
                            />
                        )}

                        {images.length > 1 && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
                                    onClick={goToPrevious}
                                >
                                    <ChevronLeft className="h-8 w-8" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
                                    onClick={goToNext}
                                >
                                    <ChevronRight className="h-8 w-8" />
                                </Button>
                            </>
                        )}

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                            {selectedIndex !== null && `${selectedIndex + 1} / ${images.length}`}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
