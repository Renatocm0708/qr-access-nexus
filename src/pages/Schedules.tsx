
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ScheduleForm } from '@/components/schedule/ScheduleForm';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash, Clock } from 'lucide-react';
import { Schedule } from '@/types';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Schedules() {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | undefined>();
  const [scheduleToDelete, setScheduleToDelete] = useState<Schedule | undefined>();

  // Demo data - in a real app this would come from an API
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 'schedule-1',
      name: 'Horario laboral',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      startTime: '08:00',
      endTime: '18:00',
    },
    {
      id: 'schedule-2',
      name: 'Horario nocturno',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      startTime: '20:00',
      endTime: '06:00',
    },
    {
      id: 'schedule-3',
      name: 'Fin de semana',
      days: ['saturday', 'sunday'],
      startTime: '09:00',
      endTime: '15:00',
    },
  ]);

  const handleSaveSchedule = (scheduleData: Schedule) => {
    if (schedules.some(s => s.id === scheduleData.id)) {
      // Update existing schedule
      setSchedules(schedules.map(s => 
        s.id === scheduleData.id ? scheduleData : s
      ));
      toast({
        title: 'Horario actualizado',
        description: `El horario "${scheduleData.name}" ha sido actualizado.`,
      });
    } else {
      // Add new schedule
      setSchedules([...schedules, scheduleData]);
      toast({
        title: 'Horario creado',
        description: `El horario "${scheduleData.name}" ha sido creado.`,
      });
    }
  };

  const handleEditSchedule = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (schedule: Schedule) => {
    setScheduleToDelete(schedule);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (scheduleToDelete) {
      setSchedules(schedules.filter(s => s.id !== scheduleToDelete.id));
      toast({
        title: 'Horario eliminado',
        description: `El horario "${scheduleToDelete.name}" ha sido eliminado.`,
      });
      setIsDeleteDialogOpen(false);
      setScheduleToDelete(undefined);
    }
  };

  const getDayNames = (days: string[]) => {
    const dayMap: { [key: string]: string } = {
      monday: 'Lun',
      tuesday: 'Mar',
      wednesday: 'Mié',
      thursday: 'Jue',
      friday: 'Vie',
      saturday: 'Sáb',
      sunday: 'Dom',
    };
    
    return days.map(day => dayMap[day] || day).join(', ');
  };

  return (
    <DashboardLayout title="Horarios">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-semibold">Configuración de Horarios</h1>
          <Button onClick={() => {
            setSelectedSchedule(undefined);
            setIsFormOpen(true);
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Crear nuevo horario
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedules.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No hay horarios configurados
            </div>
          ) : (
            schedules.map((schedule) => (
              <Card key={schedule.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{schedule.name}</CardTitle>
                      <CardDescription>{getDayNames(schedule.days)}</CardDescription>
                    </div>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold mb-4">
                    {schedule.startTime} - {schedule.endTime}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => handleEditSchedule(schedule)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full text-destructive hover:text-destructive"
                      onClick={() => handleDeleteClick(schedule)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <ScheduleForm
          open={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedSchedule(undefined);
          }}
          onSave={handleSaveSchedule}
          editSchedule={selectedSchedule}
        />

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción eliminará el horario "{scheduleToDelete?.name}" permanentemente 
                y no podrá recuperarse.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete}>Eliminar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
}
