const FleetSeed = {
  orders: [
    { id: 'FO-1021', client: 'Nordic Retail', route: 'Gdańsk → Poznań', status: 'in-progress', eta: '2h 15m', priority: 'high', updated: '2025-12-15T09:00:00Z', createdBy: 'u_disp_1' },
    { id: 'FO-0988', client: 'Baltic Fresh', route: 'Warszawa → Berlin', status: 'delayed', eta: '4h 40m', priority: 'high', updated: '2025-12-15T07:20:00Z', createdBy: 'u_disp_1' },
    { id: 'FO-0975', client: 'AeroParts', route: 'Wrocław → Hamburg', status: 'delivered', eta: 'Dostarczono', priority: 'medium', updated: '2025-12-14T21:00:00Z', createdBy: 'u_admin_1' },
    { id: 'FO-0991', client: 'PharmaOne', route: 'Łódź → Kraków', status: 'pending', eta: '6h 00m', priority: 'low', updated: '2025-12-15T08:10:00Z', createdBy: 'u_admin_1' },
    { id: 'FO-1004', client: 'Green Market', route: 'Katowice → Lublin', status: 'in-progress', eta: '3h 35m', priority: 'medium', updated: '2025-12-15T09:30:00Z', createdBy: 'u_disp_1' },
    { id: 'FO-1009', client: 'MedLog', route: 'Poznań → Brno', status: 'delayed', eta: '5h 15m', priority: 'high', updated: '2025-12-15T06:50:00Z', createdBy: 'u_admin_1' },
    { id: 'FO-1015', client: 'FreshBox', route: 'Gdynia → Szczecin', status: 'in-progress', eta: '1h 50m', priority: 'low', updated: '2025-12-15T09:40:00Z', createdBy: 'u_disp_1' }
  ],
  vehicles: [
    { id: 'GD-5402N', type: 'Chłodnia', status: 'on-route', lastCheck: '2025-12-14', driver: 'K. Mazur', createdBy: 'u_admin_1' },
    { id: 'WA-9932K', type: 'Naczepa mega', status: 'available', lastCheck: '2025-12-10', driver: 'L. Kowal', createdBy: 'u_disp_1' },
    { id: 'PO-2201X', type: 'Plandeka', status: 'maintenance', lastCheck: '2025-12-12', driver: 'A. Lewandowska', createdBy: 'u_admin_1' },
    { id: 'KR-4412J', type: 'Furgon', status: 'available', lastCheck: '2025-12-15', driver: 'S. Wójcik', createdBy: 'u_disp_1' },
    { id: 'LU-7811L', type: 'Plandeka', status: 'on-route', lastCheck: '2025-12-13', driver: 'E. Piątek', createdBy: 'u_disp_1' }
  ],
  drivers: [
    { name: 'Kinga Mazur', status: 'on-route', lastTrip: 'Gdańsk → Poznań', phone: '+48 600 200 111', createdBy: 'u_disp_1' },
    { name: 'Łukasz Kowal', status: 'available', lastTrip: 'Warszawa → Rzeszów', phone: '+48 600 200 112', createdBy: 'u_admin_1' },
    { name: 'Anna Lewandowska', status: 'maintenance', lastTrip: 'Poznań → Brno', phone: '+48 600 200 113', createdBy: 'u_disp_1' },
    { name: 'Szymon Wójcik', status: 'available', lastTrip: 'Kraków → Ostrava', phone: '+48 600 200 114', createdBy: 'u_admin_1' },
    { name: 'Ewelina Piątek', status: 'on-route', lastTrip: 'Katowice → Lublin', phone: '+48 600 200 115', createdBy: 'u_disp_1' }
  ],
  activities: [
    { title: 'Zlecenie FO-1021 zaktualizowane', detail: 'ETA przeliczone po opóźnieniu na granicy', time: '12 min temu' },
    { title: 'Pojazd LU-7811L po przeglądzie', detail: 'Serwis zakończony, gotowy do wysyłki', time: '34 min temu' },
    { title: 'Kierowca Szymon Wójcik rozpoczął zmianę', detail: 'Gotowy do przydziału', time: '1h temu' },
    { title: 'Raport wyeksportowany', detail: 'Zapisano szkic terminowości za Q4', time: '3h temu' }
  ],
  alerts: [
    { type: 'Opóźnienie', message: 'Kolejka na A2 dodaje +45 min do FO-0988', severity: 'wysoki' },
    { type: 'Serwis', message: 'Pojazd PO-2201X wymaga kontroli hamulców', severity: 'średni' },
    { type: 'SLA', message: 'Terminowość spadła do 94.2%', severity: 'niski' }
  ],
  reports: {
    performance: [
      { label: 'Terminowość', value: 94 },
      { label: 'Opóźnione', value: 4 },
      { label: 'Zdarzenia', value: 2 }
    ],
    summary: [
      { metric: 'Śr. dokładność ETA', value: '96.4%' },
      { metric: 'Przebieg (tydzień)', value: '41,200 km' },
      { metric: 'Szac. CO2', value: '12.4 t' },
      { metric: 'Wykorzystanie', value: '82%' }
    ]
  }
};

window.FleetSeed = FleetSeed;
