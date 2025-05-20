
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AccessLog } from '@/types';

type AccessLogsTableProps = {
  logs: AccessLog[];
};

export function AccessLogsTable({ logs }: AccessLogsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha y hora</TableHead>
            <TableHead>Persona</TableHead>
            <TableHead>Documento</TableHead>
            <TableHead>Resultado</TableHead>
            <TableHead>Terminal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                No hay registros de acceso
              </TableCell>
            </TableRow>
          ) : (
            logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>{log.personName}</TableCell>
                <TableCell>{log.documentId}</TableCell>
                <TableCell>
                  <Badge 
                    variant={log.allowed ? "default" : "destructive"}
                    className="capitalize"
                  >
                    {log.allowed ? "Permitido" : "Denegado"}
                  </Badge>
                </TableCell>
                <TableCell>{log.terminal}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
