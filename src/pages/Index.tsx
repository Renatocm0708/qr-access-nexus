
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersRound, QrCode, Clock, DoorOpen } from 'lucide-react';

export default function Index() {
  // In a real app, these would be fetched from an API
  const stats = {
    totalPeople: 156,
    activeQrCodes: 132,
    schedules: 12,
    accessToday: 89,
  };

  const recentActivity = [
    { time: '09:45', person: 'Juan Pérez', action: 'Acceso permitido', terminal: 'Puerta principal' },
    { time: '09:32', person: 'María López', action: 'Acceso permitido', terminal: 'Entrada oficinas' },
    { time: '09:15', person: 'Carlos Gómez', action: 'Acceso denegado', terminal: 'Puerta principal' },
    { time: '08:55', person: 'Laura Torres', action: 'Acceso permitido', terminal: 'Entrada oficinas' },
    { time: '08:30', person: 'Roberto Silva', action: 'Acceso permitido', terminal: 'Puerta principal' },
  ];

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Personas registradas</CardTitle>
            <UsersRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPeople}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Códigos QR activos</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeQrCodes}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horarios configurados</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.schedules}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accesos hoy</CardTitle>
            <DoorOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.accessToday}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Actividad reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start justify-between border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{activity.person}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action} - {activity.terminal}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado de terminales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  <p className="font-medium">Puerta principal</p>
                </div>
                <span className="text-sm text-green-600">Conectado</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  <p className="font-medium">Entrada oficinas</p>
                </div>
                <span className="text-sm text-green-600">Conectado</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <p className="font-medium">Entrada almacén</p>
                </div>
                <span className="text-sm text-yellow-600">Sincronizando</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <p className="font-medium">Sala de servidores</p>
                </div>
                <span className="text-sm text-red-600">Error</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
