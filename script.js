const ramos = [
  { codigo: "IN1002C", nombre: "Cálculo I", semestre: 1 },
  { codigo: "IN1039C", nombre: "Introducción a la Ing. Informática", semestre: 1 },
  { codigo: "TE0007C", nombre: "Fundamentos Filosóficos", semestre: 1 },
  { codigo: "IN1001C", nombre: "Álgebra", semestre: 1 },

  { codigo: "IN1005C", nombre: "Cálculo II", semestre: 2, prerrequisitos: ["IN1002C"] },
  { codigo: "IN1004C", nombre: "Álgebra Lineal", semestre: 2, prerrequisitos: ["IN1001C"] },
  { codigo: "IN1044C", nombre: "Lógica y Estructuras Discretas", semestre: 2 },
  { codigo: "IN1045C", nombre: "Taller de Programación I", semestre: 2, prerrequisitos: ["IN1039C"] },
  { codigo: "TE0008C", nombre: "Fundamentos Teológicos", semestre: 2 },
  { codigo: "CS0001C", nombre: "Química General", semestre: 2 },

  { codigo: "IN1009C", nombre: "Cálculo III", semestre: 3, prerrequisitos: ["IN1005C"] },
  { codigo: "IN1053C", nombre: "Estática y Dinámica", semestre: 3 },
  { codigo: "IN1069C", nombre: "Estructuras de Datos", semestre: 3, prerrequisitos: ["IN1045C"] },
  { codigo: "TE0009C", nombre: "Doctrina Social de la Iglesia", semestre: 3 },
  { codigo: "IN1071C", nombre: "Taller de Programación II", semestre: 3, prerrequisitos: ["IN1045C"] },

  { codigo: "TE0010C", nombre: "Ética Empresarial y Social", semestre: 4 },
  { codigo: "IN1070C", nombre: "Inteligencia Artificial", semestre: 4, prerrequisitos: ["IN1069C"] },
  { codigo: "IN1008C", nombre: "Ecuaciones Diferenciales", semestre: 4, prerrequisitos: ["IN1009C"] },
  { codigo: "IN1062C", nombre: "Probabilidades y Estadística", semestre: 4, prerrequisitos: ["IN1005C"] },
  { codigo: "IN1068C", nombre: "Electromagnetismo y Circuitos", semestre: 4, prerrequisitos: ["IN1053C"] },

  { codigo: "IN1067C", nombre: "Termodinámica y Fluidos", semestre: 5 },
  { codigo: "IN1073C", nombre: "Autómatas y Lenguajes Formales", semestre: 5, prerrequisitos: ["IN1044C"] },
  { codigo: "ED0021C", nombre: "Inglés I", semestre: 5 },
  { codigo: "IN1072C", nombre: "Sistemas Digitales", semestre: 5, prerrequisitos: ["IN1068C"] },
  { codigo: "IN1065C", nombre: "Teoría de Sistemas", semestre: 5 },
  { codigo: "IN1055C", nombre: "Ambiente y Energía", semestre: 5 },
  { codigo: "IN1075C", nombre: "Bases de Datos", semestre: 5, prerrequisitos: ["IN1069C"] },

  { codigo: "ED0022C", nombre: "Inglés II", semestre: 6 },
  { codigo: "IN1074C", nombre: "Arquitectura de Computadores", semestre: 6, prerrequisitos: ["IN1072C"] },
  { codigo: "IN1076C", nombre: "Ingeniería de Software", semestre: 6, prerrequisitos: ["IN1071C"] },
  { codigo: "EC0004C", nombre: "Administración y RRHH", semestre: 6 },

  { codigo: "IN1078C", nombre: "Taller de Bases de Datos", semestre: 7, prerrequisitos: ["IN1075C"] },
  { codigo: "ED0023C", nombre: "Inglés III", semestre: 7 },
  { codigo: "IN1077C", nombre: "Sistemas Operativos", semestre: 7, prerrequisitos: ["IN1074C"] },
  { codigo: "EC0002C", nombre: "Contabilidad y Finanzas", semestre: 7 },
  { codigo: "EC0003C", nombre: "Economía", semestre: 7 },

  { codigo: "IN1080C", nombre: "Taller de Ing. de Software I", semestre: 8, prerrequisitos: ["IN1076C"] },
  { codigo: "DE0005C", nombre: "Derecho Informático", semestre: 8 },
  { codigo: "IN1079C", nombre: "Comunicación de Datos", semestre: 8 },
  { codigo: "IN1081C", nombre: "Tópicos en Investigación de Operaciones", semestre: 8 },
  { codigo: "IN1033C", nombre: "Ingeniería Económica", semestre: 8 },

  { codigo: "IN1083C", nombre: "Taller de Ing. de Software II", semestre: 9, prerrequisitos: ["IN1080C"] },
  { codigo: "IN1082C", nombre: "Redes de Computadores", semestre: 9 },
  { codigo: "IN1084C", nombre: "Práctica", semestre: 10 },
  { codigo: "IN1085C", nombre: "Formulación y Evaluación de Proyectos Informáticos", semestre: 10 },

  { codigo: "IN1999C", nombre: "Preparación para la HP", semestre: 11 },
  { codigo: "IN2000C", nombre: "Habilitación Profesional", semestre: 12 },

  { codigo: "OPT1", nombre: "Optativo de Profundización I", semestre: 10 },
  { codigo: "OPT2", nombre: "Optativo de Profundización II", semestre: 10 },
  { codigo: "OPT3", nombre: "Optativo de Profundización III", semestre: 11 },
  { codigo: "OPT4", nombre: "Optativo de Profundización IV", semestre: 11 },
  { codigo: "OPT5", nombre: "Optativo de Profundización V", semestre: 11 },
  { codigo: "OPT6", nombre: "Optativo de Profundización VI", semestre: 11 },
];

const mallaDiv = document.getElementById("malla");
const tooltip = document.getElementById("tooltip");
const svg = document.getElementById("canvas");
const posicionRamos = {};
const aprobados = new Set(JSON.parse(localStorage.getItem("aprobados")) || []);

ramos.forEach((ramo) => {
  const div = document.createElement("div");
  div.className = "ramo";
  div.innerHTML = `<strong>${ramo.nombre}</strong><br><small>${ramo.codigo}</small>`;
  div.dataset.codigo = ramo.codigo;

  if (ramo.prerrequisitos) {
    div.classList.add("prerrequisito");
  }

  if (aprobados.has(ramo.codigo)) {
    div.classList.add("aprobado");
  }

  div.addEventListener("click", () => {
    div.classList.toggle("aprobado");
    if (div.classList.contains("aprobado")) {
      aprobados.add(ramo.codigo);
    } else {
      aprobados.delete(ramo.codigo);
    }
    localStorage.setItem("aprobados", JSON.stringify([...aprobados]));
  });

  div.addEventListener("mouseenter", () => {
    const relacionados = new Set(ramo.prerrequisitos || []);
    document.querySelectorAll(".ramo").forEach(el => {
      if (relacionados.has(el.dataset.codigo)) {
        el.classList.add("resaltado");
      }
    });
    tooltip.textContent = `${ramo.nombre} (${ramo.codigo})`;
    tooltip.classList.remove("hidden");
  });

  div.addEventListener("mousemove", e => {
    tooltip.style.top = `${e.pageY + 10}px`;
    tooltip.style.left = `${e.pageX + 10}px`;
  });

  div.addEventListener("mouseleave", () => {
    document.querySelectorAll(".ramo.resaltado").forEach(el => el.classList.remove("resaltado"));
    tooltip.classList.add("hidden");
  });

  mallaDiv.appendChild(div);
  posicionRamos[ramo.codigo] = div;
});

function conectarRamos() {
  svg.innerHTML = "";
  const svgRect = svg.getBoundingClientRect();

  ramos.forEach(ramo => {
    if (ramo.prerrequisitos) {
      const target = posicionRamos[ramo.codigo].getBoundingClientRect();
      ramo.prerrequisitos.forEach(pr => {
        const source = posicionRamos[pr]?.getBoundingClientRect();
        if (source && target) {
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          const x1 = source.left + source.width / 2 - svgRect.left;
          const y1 = source.bottom - svgRect.top;
          const x2 = target.left + target.width / 2 - svgRect.left;
          const y2 = target.top - svgRect.top;

          line.setAttribute("x1", x1);
          line.setAttribute("y1", y1);
          line.setAttribute("x2", x2);
          line.setAttribute("y2", y2);
          line.setAttribute("stroke", "#007bff");
          line.setAttribute("stroke-width", "2");
          svg.appendChild(line);
        }
      });
    }
  });
}

window.addEventListener("load", () => setTimeout(conectarRamos, 500));
window.addEventListener("resize", () => setTimeout(conectarRamos, 500));

