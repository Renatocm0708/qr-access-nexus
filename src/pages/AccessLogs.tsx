
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AccessLogsTable } from '@/components/access/AccessLogsTable';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Calendar } from 'lucide-react';
import { AccessLog } from '@/types';

export default function AccessLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Demo data - in a real app this would come from an API
  const [logs, setLogs] = useState<AccessLog[]>([
    {
      id: 'log-1',
      timestamp: '2023-06-01 08:30',
      personId: '1',
      personName: 'Juan Pérez',
      documentId: '12345678',
      allowed: true,
      terminal: 'Puerta principal',
    },
    {
      id: 'log-2',
      timestamp: '2023-06-01 09:15',
      personId: '2',
      personName: 'María López',
      documentId: '87654321',
      allowed: true,
      terminal: 'Entrada oficinas',
    },
    {
      id: 'log-3',
      timestamp: '2023-06-01 09:45',
      personId: '3',
      personName: 'Carlos Gómez',
      documentId: '11223344',
      allowed: false,
      terminal: 'Puerta principal',
    },
    {
      id: 'log-4',
      timestamp: '2023-05-31 08:10',
      personId: '1',
      personName: 'Juan Pérez',
      documentId: '12345678',
      allowed: true,
      terminal: 'Puerta principal',
    },
    {
      id: 'log-5',
      timestamp: '2023-05-31 17:45',
      personId: '2',
      personName: 'María López',
      documentId: '87654321',
      allowed: true,
      terminal: 'Entrada oficinas',
    },
  ]);

  const filteredLogs = logs.filter(log => {
    const matchesQuery = 
      log.personName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      log.documentId.includes(searchQuery);
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'allowed' && log.allowed) || 
      (statusFilter === 'denied' && !log.allowed);
    
    const matchesDate = 
      dateFilter === 'all' || 
      (dateFilter === 'today' && log.timestamp.includes('2023-06-01')) || 
      (dateFilter === 'yesterday' && log.timestamp.includes('2023-05-31'));
    
    return matchesQuery && matchesStatus && matchesDate;
  });

  return (
    <DashboardLayout title="Registros de acceso">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">Historial de Accesos</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o documento..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select
              value={dateFilter}
              onValueChange={setDateFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por fecha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las fechas</SelectItem>
                <SelectItem value="today">Hoy</SelectItem>
                <SelectItem value="yesterday">Ayer</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="allowed">Permitidos</SelectItem>
                <SelectItem value="denied">Denegados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <AccessLogsTable logs={filteredLogs} />

        <div className="flex justify-between items-center text-muted-foreground text-sm">
          <div>
            Mostrando {filteredLogs.length} de {logs.length} registros
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Última actualización: 2023-06-01 10:15</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
