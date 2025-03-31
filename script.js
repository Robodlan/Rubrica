document.getElementById("downloadPDF").addEventListener("click", function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Título y encabezados
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("GOBIERNO DE PUERTO RICO", 10, 10);
  doc.text("ESCUELA ESPECIALIZADA LIBRE DE MÚSICA ANTONIO PAOLI", 10, 18);
  doc.text("LABOR DIARIA", 10, 26);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  // Capturar los valores de los inputs
  const mes = document.getElementById("mes").value;
  const nombre = document.getElementById("nombre").value;
  const instrumento = document.getElementById("instrumento").value;
  const profesor = document.getElementById("profesor").value;
  const puntuacion = document.getElementById("puntuacion").value;

  // Agregar datos al PDF
  doc.text(`Mes: ${mes}`, 10, 36);
  doc.text(`Nombre del Estudiante: ${nombre}`, 10, 44);
  doc.text(`Instrumento: ${instrumento}`, 10, 52);
  doc.text(`Profesor(a): ${profesor}`, 10, 60);
  doc.text(`Puntuación Mensual: ${puntuacion}`, 10, 68);

  // Datos de clase
  const clases = document.querySelectorAll(".clase");
  let y = 78;

  clases.forEach((clase, index) => {
    const claseNum = clase.querySelector("input[type='text']").value;
    const fecha = clase.querySelector("input[type='date']").value;

    doc.text(`Clase #${index + 1}: ${claseNum} - Fecha: ${fecha}`, 10, y);
    y += 8;

    // Checkboxes seleccionados
    const checks = clase.querySelectorAll("input[type='checkbox']");
    checks.forEach((check) => {
      if (check.checked) {
        doc.text(`✓ ${check.parentElement.innerText}`, 15, y);
        y += 6;
      }
    });

    // Notas
    const inputs = clase.querySelectorAll(".notas input");
    inputs.forEach((input) => {
      doc.text(`${input.previousSibling.textContent} ${input.value}`, 10, y);
      y += 6;
    });

    y += 6;
  });

  // Guardar el PDF
  doc.save("labor_diaria.pdf");
});
