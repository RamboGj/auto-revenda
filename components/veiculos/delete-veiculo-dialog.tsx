"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteVeiculoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  veiculo: {
    id: string
    marca: string
    modelo: string
  }
  onDelete: () => void
}

export function DeleteVeiculoDialog({ open, onOpenChange, veiculo, onDelete }: DeleteVeiculoDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir veículo</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o veículo{" "}
            <span className="font-medium">
              {veiculo.marca} {veiculo.modelo}
            </span>
            ? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

