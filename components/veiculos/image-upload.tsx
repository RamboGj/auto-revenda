"use client"

import { useState } from "react"
import { X, Upload, ImageIcon } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
}

export function ImageUpload({ images, onChange, maxImages = 5 }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  // Função para simular upload de imagem
  // Em um ambiente real, isso enviaria a imagem para um servidor
  const handleImageUpload = (files: FileList | null) => {
    if (!files) return

    // Verificar se já atingiu o número máximo de imagens
    if (images.length >= maxImages) {
      alert(`Você só pode adicionar até ${maxImages} imagens.`)
      return
    }

    // Converter FileList para Array
    const fileArray = Array.from(files)
    
    // Limitar o número de arquivos que podem ser adicionados
    const filesToAdd = fileArray.slice(0, maxImages - images.length)
    
    // Para cada arquivo, criar uma URL temporária
    // Em um ambiente real, você enviaria o arquivo para um servidor e receberia a URL
    filesToAdd.forEach((file) => {
      if (file.type.startsWith("image/")) {
        // Simular upload criando uma URL temporária
        // Em produção, você enviaria para um serviço de armazenamento como S3, Cloudinary, etc.
        const imageUrl = URL.createObjectURL(file)
        onChange([...images, imageUrl])
      }
    })
  }

  // Função para remover uma imagem
  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    onChange(newImages)
  }

  // Manipuladores de eventos para drag and drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files)
    }
  }

  return (
    <div className="space-y-4">
      {/* Área de upload */}
      <div
        className={cn(
          "flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-4 transition-colors",
          dragActive
            ? "border-primary/50 bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById("image-upload")?.click()}
      >
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="rounded-full bg-primary/10 p-2">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="text-sm font-medium">
            Arraste e solte imagens ou clique para selecionar
          </div>
          <div className="text-xs text-muted-foreground">
            Suporta JPG, PNG ou WEBP (máx. {maxImages} imagens)
          </div>
        </div>
        <input
          id="image-upload"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleImageUpload(e.target.files)}
        />
      </div>

      {/* Visualização das imagens */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-md border"
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Imagem ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-1 top-1 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveImage(index)
                }}
              >
                <X className="h-3 w-3" />
              </Button>
              {index === 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-primary/80 px-2 py-1 text-center text-xs font-medium text-primary-foreground">
                  Imagem principal
                </div>
              )}
            </div>
          ))}
          
          {/* Espaços vazios para mostrar quantas imagens ainda podem ser adicionadas */}
          {Array.from({ length: Math.min(maxImages - images.length, 5) }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="flex aspect-square items-center justify-center rounded-md border border-dashed border-muted-foreground/25"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
