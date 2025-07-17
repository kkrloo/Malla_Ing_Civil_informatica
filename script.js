const ramos = [
  { codigo: "IN1002C", nombre: "Cálculo I", semestre: 1 },
  { codigo: "IN1039C", nombre: "Intro a Ing. Informática", semestre: 1 },
  { codigo: "IN1001C", nombre: "Álgebra", semestre: 1 },

  { codigo: "IN1005C", nombre: "Cálculo II", semestre: 2, prerrequisitos: ["IN1002C"] },
  { codigo: "IN1004C", nombre: "Álgebra Lineal", semestre: 2, prerrequisitos: ["IN1001C"] },
  { codigo: "IN1045C", nombre: "Taller de Programación I", semestre: 2, prerrequisitos: ["IN1039C"] },

  { codigo: "IN1009C", nombre: "Cálculo III", semestre: 3, prerrequisitos: ["IN1005C"] },
  { codigo: "IN1069C", nombre: "Estructuras de Datos", semestre: 3, prerrequisitos: ["IN1045C"] },
  { codigo: "IN1071C", nombre: "Taller de Programación II", semestre: 3, prerrequisitos: ["IN1045C"] },

  { codigo: "IN1008C", nombre: "Ecuaciones Diferenciales", semestre: 4, prerrequisitos: ["IN1009C"] },
  { codigo: "IN1070C", nombre: "Inteligencia Artificial", semestre: 4, prerrequisitos: ["IN1069C"] },
  { codigo: "IN1062C", nombre: "Probabilidades y Estadística", semestre: 4, prerrequisitos: ["IN1005C"] },
  { codigo: "IN1068C", nombre: "Electromagnetismo y Circuitos", semestre: 4, prerrequisitos: ["IN1053C"] },

  { codigo: "IN1073C", nombre: "Autómatas y Lenguajes Formales", semestre: 5, prerrequisitos: ["IN1044C"] },
  { codigo: "IN1072C", nombre: "Sistemas Digitales", semestre: 5, prerrequisitos: ["IN1068C"] },
  { codigo: "IN1075C", nombre: "Bases de Datos", semestre: 5, prerrequisitos: ["IN1069C"] },

  { codigo: "IN1074C", nombre: "Arquitectura de Computadores", semestre: 6, prerrequisitos: ["IN1072C"] },
  { codigo: "IN1076C", nombre: "Ingeniería de Software", semestre: 6, prerrequisitos: ["IN1071C"] },

  { codigo: "IN1078C", nombre: "Taller de Bases de Datos", semestre: 7, prerrequisitos: ["IN1075C"] },
  { codigo: "IN1077C", nombre: "Sistemas Operativos", semestre: 7, prerrequisitos: ["IN1074C"] },

  { codigo: "IN1080C", nombre: "Taller de Ing. de Software I", semestre: 8, prerrequisitos: ["IN1076C"] },

  { codigo: "IN1083C", nombre: "Taller de Ing. de Software II", semestre: 9, prerrequisitos: ["IN1080C"] },

  { codigo: "IN1084C", nombre: "Práctica", semestre: 10 },
  { codigo: "IN1085C", nombre: "Formulación y Ev. de Proy. Inf.", semestre: 10, prerrequisitos: ["IN1033C"] },

  { codigo: "IN2000C", nombre: "Habilitación Profesional", semestre: 12 },
];

const mallaDiv = document.getElementById("malla");
const tooltip = document.getElementById("tooltip");
const svg = document.getElementById("canvas");
const posicionRamos = {};

ramos.forEach((ramo) => {
  const div = document.createElement("div");
  div.className = "ramo";
  div.innerHTML = `<strong>${ramo.nombre}</strong><br><small>${ramo.codigo}</small>`;
  div.dataset.codigo = ramo.codigo;

  if (ramo.prerrequisitos) {
    div.classList.add("prerrequisito");
  }

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
