
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PersonTable } from '@/components/person/PersonTable';
import { AddPersonModal } from '@/components/person/AddPersonModal';
import { QRCodeGenerator } from '@/components/qr/QRCodeGenerator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { Person } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function People() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | undefined>();

  // Demo data - in a real app this would come from an API
  const [people, setPeople] = useState<Person[]>([
    {
      id: '1',
      firstName: 'Juan',
      lastName: 'Pérez',
      documentId: '12345678',
      email: 'juan@example.com',
      phone: '+123456789',
      active: true,
      hasQrCode: true,
      schedule: 'Horario laboral',
      scheduleId: 'schedule-1',
    },
    {
      id: '2',
      firstName: 'María',
      lastName: 'López',
      documentId: '87654321',
      email: 'maria@example.com',
      active: true,
      hasQrCode: true,
      schedule: 'Horario laboral',
      scheduleId: 'schedule-1',
    },
    {
      id: '3',
      firstName: 'Carlos',
      lastName: 'Gómez',
      documentId: '11223344',
      email: 'carlos@example.com',
      active: false,
      hasQrCode: false,
    },
  ]);

  // Demo data - in a real app this would come from an API
  const schedules = [
    { id: 'schedule-1', name: 'Horario laboral' },
    { id: 'schedule-2', name: 'Horario nocturno' },
    { id: 'schedule-3', name: 'Fin de semana' },
  ];

  const handleAddPerson = (personData: Partial<Person>) => {
    if (personData.id) {
      // Update existing person
      setPeople(people.map(p => 
        p.id === personData.id ? { ...p, ...personData } : p
      ));
      toast({
        title: 'Persona actualizada',
        description: `${personData.firstName} ${personData.lastName} ha sido actualizado correctamente.`,
      });
    } else {
      // Add new person
      const newPerson: Person = {
        id: `person-${Date.now()}`,
        firstName: personData.firstName || '',
        lastName: personData.lastName || '',
        documentId: personData.documentId || '',
        email: personData.email,
        phone: personData.phone,
        active: true,
        hasQrCode: personData.hasQrCode || false,
        schedule: schedules.find(s => s.id === personData.scheduleId)?.name,
        scheduleId: personData.scheduleId,
      };
      
      setPeople([...people, newPerson]);
      toast({
        title: 'Persona agregada',
        description: `${newPerson.firstName} ${newPerson.lastName} ha sido agregado correctamente.`,
      });
    }
  };

  const handleEditPerson = (person: Person) => {
    setSelectedPerson(person);
    setIsAddModalOpen(true);
  };

  const handleDeletePerson = (id: string) => {
    const personToDelete = people.find(p => p.id === id);
    setPeople(people.filter(p => p.id !== id));
    
    toast({
      title: 'Persona eliminada',
      description: `${personToDelete?.firstName} ${personToDelete?.lastName} ha sido eliminado.`,
    });
  };

  const handleViewQR = (id: string) => {
    const person = people.find(p => p.id === id);
    if (person) {
      setSelectedPerson(person);
      setIsQrModalOpen(true);
    }
  };

  const filteredPeople = people.filter(person => 
    `${person.firstName} ${person.lastName} ${person.documentId}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout title="Personas">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-semibold">Gestión de Personas</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Agregar Persona
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o documento..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <PersonTable 
          people={filteredPeople}
          onEdit={handleEditPerson}
          onDelete={handleDeletePerson}
          onViewQR={handleViewQR}
        />

        <AddPersonModal
          open={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setSelectedPerson(undefined);
          }}
          onSave={handleAddPerson}
          schedules={schedules}
          editPerson={selectedPerson}
        />

        <QRCodeGenerator
          open={isQrModalOpen}
          onClose={() => {
            setIsQrModalOpen(false);
            setSelectedPerson(undefined);
          }}
          person={selectedPerson}
        />
      </div>
    </DashboardLayout>
  );
}
