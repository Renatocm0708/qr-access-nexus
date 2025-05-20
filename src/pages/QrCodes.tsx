
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Mail, Search } from 'lucide-react';
import { QRCode } from '@/types';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function QrCodes() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Demo data - in a real app this would come from an API
  const [qrCodes, setQrCodes] = useState<QRCode[]>([
    {
      id: 'qr-1',
      personId: '1',
      personName: 'Juan Pérez',
      createdAt: '2023-05-10',
      expiresAt: '2023-12-31',
      imageUrl: '/qr-placeholder.png',
      active: true,
    },
    {
      id: 'qr-2',
      personId: '2',
      personName: 'María López',
      createdAt: '2023-05-11',
      imageUrl: '/qr-placeholder.png',
      active: true,
    },
    {
      id: 'qr-3',
      personId: '3',
      personName: 'Carlos Gómez',
      createdAt: '2023-03-15',
      expiresAt: '2023-04-30',
      imageUrl: '/qr-placeholder.png',
      active: false,
    },
  ]);

  const handleDownload = (qrId: string) => {
    // In a real app, this would download the QR code
    const qr = qrCodes.find(q => q.id === qrId);
    toast({
      title: 'QR descargado',
      description: `El código QR de ${qr?.personName} ha sido descargado.`,
    });
  };

  const handleSendEmail = (qrId: string) => {
    // In a real app, this would send the QR code to the user's email
    const qr = qrCodes.find(q => q.id === qrId);
    toast({
      title: 'QR enviado por correo',
      description: `El código QR de ${qr?.personName} ha sido enviado por correo.`,
    });
  };

  const filteredQrCodes = qrCodes.filter(qr => {
    const matchesQuery = qr.personName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'active' && qr.active) || 
                          (statusFilter === 'expired' && !qr.active);
    
    return matchesQuery && matchesStatus;
  });

  return (
    <DashboardLayout title="Códigos QR">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-semibold">Códigos QR Generados</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Activos</SelectItem>
              <SelectItem value="expired">Expirados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQrCodes.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No se encontraron códigos QR
            </div>
          ) : (
            filteredQrCodes.map((qrCode) => (
              <Card key={qrCode.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    {/* QR Code Image Placeholder */}
                    <div className="bg-white p-4 rounded-lg border mb-4">
                      <div className="w-36 h-36 bg-gray-800 flex items-center justify-center">
                        <span className="text-white">QR Sample</span>
                      </div>
                    </div>

                    <div className="text-center mb-4">
                      <h3 className="font-medium text-lg">{qrCode.personName}</h3>
                      
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <Badge variant={qrCode.active ? "default" : "secondary"}>
                          {qrCode.active ? "Activo" : "Expirado"}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mt-2">
                        <p>Creado: {qrCode.createdAt}</p>
                        {qrCode.expiresAt && (
                          <p>Expira: {qrCode.expiresAt}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 w-full">
                      <Button 
                        variant="outline" 
                        className="w-1/2"
                        onClick={() => handleDownload(qrCode.id)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Descargar
                      </Button>
                      
                      <Button 
                        className="w-1/2"
                        onClick={() => handleSendEmail(qrCode.id)}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Enviar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
