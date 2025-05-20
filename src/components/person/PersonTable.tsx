
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, Edit, Trash, MoreHorizontal } from 'lucide-react';
import { Person } from '@/types';

type PersonTableProps = {
  people: Person[];
  onEdit: (person: Person) => void;
  onDelete: (id: string) => void;
  onViewQR: (id: string) => void;
};

export function PersonTable({ people, onEdit, onDelete, onViewQR }: PersonTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre completo</TableHead>
            <TableHead>Documento/ID</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Código QR</TableHead>
            <TableHead>Horario</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No hay personas registradas
              </TableCell>
            </TableRow>
          ) : (
            people.map((person) => (
              <TableRow key={person.id}>
                <TableCell>
                  <div className="font-medium">{`${person.firstName} ${person.lastName}`}</div>
                </TableCell>
                <TableCell>{person.documentId}</TableCell>
                <TableCell>
                  <Badge variant={person.active ? "default" : "secondary"}>
                    {person.active ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {person.hasQrCode ? (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onViewQR(person.id)}
                    >
                      <QrCode className="h-4 w-4 mr-1" />
                      Ver QR
                    </Button>
                  ) : (
                    <span className="text-muted-foreground text-sm">No asignado</span>
                  )}
                </TableCell>
                <TableCell>
                  {person.schedule ? (
                    <span>{person.schedule}</span>
                  ) : (
                    <span className="text-muted-foreground text-sm">Sin horario</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(person)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      {person.hasQrCode && (
                        <DropdownMenuItem onClick={() => onViewQR(person.id)}>
                          <QrCode className="h-4 w-4 mr-2" />
                          Ver QR
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => onDelete(person.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
