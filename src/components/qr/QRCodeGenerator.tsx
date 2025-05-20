
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, Mail } from 'lucide-react';
import { Person } from '@/types';

type QRCodeGeneratorProps = {
  open: boolean;
  onClose: () => void;
  person?: Person;
};

export function QRCodeGenerator({ open, onClose, person }: QRCodeGeneratorProps) {
  if (!person) return null;

  const handleDownload = () => {
    // In a real app, we would implement actual download functionality
    console.log('Downloading QR for', person.id);
  };

  const handleSendEmail = () => {
    // In a real app, we would implement email sending functionality
    console.log('Sending QR by email to', person.email);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Código QR de acceso</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          {/* QR Code Image Placeholder - In a real app this would be a generated QR code */}
          <div className="bg-white p-4 rounded-lg border">
            <div className="w-48 h-48 bg-gray-800 flex items-center justify-center">
              <span className="text-white">QR Sample</span>
            </div>
          </div>

          <div className="text-center space-y-1">
            <h3 className="font-medium">
              {person.firstName} {person.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">{person.documentId}</p>
            
            {person.qrExpiration && (
              <div className="mt-2">
                <span className="text-sm text-muted-foreground">
                  Expira: {person.qrExpiration}
                </span>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={handleDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Descargar
          </Button>
          
          {person.email && (
            <Button 
              className="w-full sm:w-auto"
              onClick={handleSendEmail}
            >
              <Mail className="mr-2 h-4 w-4" />
              Enviar por correo
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
