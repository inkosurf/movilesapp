// Registrar el Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
      console.log('Service Worker registrado con éxito:', registration);
    })
    .catch(error => {
      console.error('Error al registrar el Service Worker:', error);
    });
}

function obtenerFechaHora() {
  const ahora = new Date();
  const dia = String(ahora.getDate()).padStart(2, '0');
  const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Enero es 0
  const anio = ahora.getFullYear();
  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
}

function registrarDatos() {
  navigator.geolocation.getCurrentPosition(function(position) {
    const latitud = position.coords.latitude;
    const longitud = position.coords.longitude;
    const fechaHora = obtenerFechaHora();
    const datos = `${fechaHora}, teta, ${latitud}, ${longitud}`;

    let registros = localStorage.getItem('registros');
    registros = registros ? JSON.parse(registros) : [];
    registros.push(datos);
    localStorage.setItem('registros', JSON.stringify(registros));

    alert('Datos registrados correctamente.');
  }, function(error) {
    alert('Error al obtener la ubicación: ' + error.message);
  });
}
// JavaScript Document