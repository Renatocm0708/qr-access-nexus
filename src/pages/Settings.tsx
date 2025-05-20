
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Terminal } from '@/types';
import { CheckCircle2, XCircle, Settings2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const deviceFormSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  ipAddress: z.string().min(1, 'La dirección IP es requerida'),
  port: z.string().min(1, 'El puerto es requerido'),
  username: z.string().min(1, 'El usuario es requerido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

type DeviceFormValues = z.infer<typeof deviceFormSchema>;

const systemFormSchema = z.object({
  systemName: z.string().min(1, 'El nombre del sistema es requerido'),
  language: z.string().min(1, 'El idioma es requerido'),
  logo: z.string().optional(),
  theme: z.string().min(1, 'El tema es requerido'),
});

type SystemFormValues = z.infer<typeof systemFormSchema>;

export default function Settings() {
  const { toast } = useToast();
  const [terminals, setTerminals] = useState<Terminal[]>([
    {
      id: 'term-1',
      name: 'Puerta principal',
      ipAddress: '192.168.1.100',
      port: '8000',
      username: 'admin',
      password: '******',
      status: 'connected',
      lastSyncTime: '2023-06-01 09:30',
    },
    {
      id: 'term-2',
      name: 'Entrada oficinas',
      ipAddress: '192.168.1.101',
      port: '8000',
      username: 'admin',
      password: '******',
      status: 'connected',
      lastSyncTime: '2023-06-01 09:15',
    },
    {
      id: 'term-3',
      name: 'Sala de servidores',
      ipAddress: '192.168.1.102',
      port: '8000',
      username: 'admin',
      password: '******',
      status: 'error',
      lastSyncTime: '2023-05-31 15:45',
    },
  ]);

  const deviceForm = useForm<DeviceFormValues>({
    resolver: zodResolver(deviceFormSchema),
    defaultValues: {
      name: '',
      ipAddress: '',
      port: '8000',
      username: 'admin',
      password: '',
    },
  });

  const systemForm = useForm<SystemFormValues>({
    resolver: zodResolver(systemFormSchema),
    defaultValues: {
      systemName: 'Sistema de Control de Acceso',
      language: 'es',
      logo: '',
      theme: 'light',
    },
  });

  const handleTestConnection = (terminalId: string) => {
    // In a real app, this would test the connection to the terminal
    setTerminals(
      terminals.map(t => 
        t.id === terminalId 
          ? { ...t, status: Math.random() > 0.3 ? 'connected' : 'error' } 
          : t
      )
    );
    
    const terminal = terminals.find(t => t.id === terminalId);
    toast({
      title: 'Prueba de conexión',
      description: `La prueba con "${terminal?.name}" ha sido completada.`,
    });
  };

  const handleSyncTerminal = (terminalId: string) => {
    // In a real app, this would sync data with the terminal
    setTerminals(
      terminals.map(t => 
        t.id === terminalId 
          ? { ...t, lastSyncTime: '2023-06-01 10:30' } 
          : t
      )
    );
    
    const terminal = terminals.find(t => t.id === terminalId);
    toast({
      title: 'Sincronización',
      description: `Los datos con "${terminal?.name}" han sido sincronizados.`,
    });
  };

  const handleAddDevice = (data: DeviceFormValues) => {
    const newTerminal: Terminal = {
      id: `term-${Date.now()}`,
      name: data.name,
      ipAddress: data.ipAddress,
      port: data.port,
      username: data.username,
      password: data.password,
      status: 'disconnected',
    };
    
    setTerminals([...terminals, newTerminal]);
    deviceForm.reset();
    
    toast({
      title: 'Dispositivo agregado',
      description: `El dispositivo "${data.name}" ha sido agregado correctamente.`,
    });
  };

  const handleSaveSystemSettings = (data: SystemFormValues) => {
    // In a real app, this would save the system settings
    toast({
      title: 'Configuración guardada',
      description: 'La configuración del sistema ha sido actualizada.',
    });
  };

  return (
    <DashboardLayout title="Configuración">
      <div className="flex flex-col space-y-8">
        <h1 className="text-2xl font-semibold">Configuración del Sistema</h1>

        <Tabs defaultValue="devices">
          <TabsList className="mb-6">
            <TabsTrigger value="devices">Dispositivos</TabsTrigger>
            <TabsTrigger value="system">Sistema</TabsTrigger>
          </TabsList>

          <TabsContent value="devices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Terminales de Control de Acceso</CardTitle>
                <CardDescription>
                  Administra las conexiones a los dispositivos Hikvision.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-md border">
                  <div className="p-4 grid grid-cols-4 font-medium text-sm">
                    <div>Nombre del terminal</div>
                    <div>Dirección IP</div>
                    <div>Estado</div>
                    <div>Acciones</div>
                  </div>
                  
                  {terminals.map((terminal) => (
                    <div 
                      key={terminal.id} 
                      className="grid grid-cols-4 border-t p-4 items-center"
                    >
                      <div>
                        <div className="font-medium">{terminal.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Usuario: {terminal.username}
                        </div>
                      </div>
                      
                      <div>
                        <div>{terminal.ipAddress}:{terminal.port}</div>
                        {terminal.lastSyncTime && (
                          <div className="text-xs text-muted-foreground">
                            Última sincronización: {terminal.lastSyncTime}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        {terminal.status === 'connected' ? (
                          <Badge className="bg-green-500">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Conectado
                          </Badge>
                        ) : terminal.status === 'disconnected' ? (
                          <Badge variant="secondary">Desconectado</Badge>
                        ) : (
                          <Badge variant="destructive">
                            <XCircle className="mr-1 h-3 w-3" />
                            Error
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTestConnection(terminal.id)}
                        >
                          Probar
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleSyncTerminal(terminal.id)}
                        >
                          Sincronizar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Agregar nuevo dispositivo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...deviceForm}>
                      <form 
                        onSubmit={deviceForm.handleSubmit(handleAddDevice)} 
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={deviceForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                  <Input placeholder="Puerta principal" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={deviceForm.control}
                            name="ipAddress"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Dirección IP</FormLabel>
                                <FormControl>
                                  <Input placeholder="192.168.1.100" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={deviceForm.control}
                            name="port"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Puerto</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={deviceForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Usuario</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={deviceForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Button type="submit">Agregar dispositivo</Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias del sistema</CardTitle>
                <CardDescription>
                  Configura las opciones generales del sistema.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...systemForm}>
                  <form 
                    onSubmit={systemForm.handleSubmit(handleSaveSystemSettings)} 
                    className="space-y-4"
                  >
                    <FormField
                      control={systemForm.control}
                      name="systemName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre del sistema</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={systemForm.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Idioma</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar idioma" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="es">Español</SelectItem>
                              <SelectItem value="en">Inglés</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={systemForm.control}
                      name="logo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo (opcional)</FormLabel>
                          <FormControl>
                            <Input type="file" />
                          </FormControl>
                          <FormDescription>
                            Sube el logo de tu empresa para personalizar la interfaz.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={systemForm.control}
                      name="theme"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tema</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar tema" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="light">Claro</SelectItem>
                              <SelectItem value="dark">Oscuro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit">Guardar configuración</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
