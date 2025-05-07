import React, { useState } from "react";
import { Card, CardContent, Button, TextField, TextareaAutosize } from "@mui/material"; // Usamos Material-UI para los componentes de la UI

export default function EnfermeriaApp() {
  const [cita, setCita] = useState({ nombre: "", matricula: "", motivo: "" });
  const [pregunta, setPregunta] = useState("");
  const [reservaExitosa, setReservaExitosa] = useState(false);
  const [preguntaExitosa, setPreguntaExitosa] = useState(false);

  // Función para manejar la reserva de cita
  const handleReserva = async () => {
    if (cita.nombre && cita.matricula && cita.motivo) {
      try {
        await fetch(
          "https://script.google.com/macros/s/AKfycbx_YPaXUQn42IFjXTcIQ_jCVjQ0NIZzJcgX2Wr8c9Vnk9sI2UOwMhjgdMk6ojG4l2w/exec",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cita),
          }
        );
        setReservaExitosa(true);
        setCita({ nombre: "", matricula: "", motivo: "" });
      } catch (error) {
        console.error("Error al enviar la cita:", error);
      }
    }
  };

  // Función para manejar las preguntas
  const handlePregunta = async () => {
    if (pregunta) {
      try {
        await fetch(
          "https://script.google.com/macros/s/AKfycbx_YPaXUQn42IFjXTcIQ_jCVjQ0NIZzJcgX2Wr8c9Vnk9sI2UOwMhjgdMk6ojG4l2w/exec",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ pregunta }),
          }
        );
        setPreguntaExitosa(true);
        setPregunta("");
      } catch (error) {
        console.error("Error al enviar la pregunta:", error);
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
        App de Enfermería - Universidad Tecmilenio
      </h1>

      {/* Sección de cita */}
      <Card style={{ marginBottom: "20px" }}>
        <CardContent style={{ padding: "20px" }}>
          <h2>Agendar Cita</h2>
          <TextField
            label="Tu nombre"
            variant="outlined"
            fullWidth
            value={cita.nombre}
            onChange={(e) => setCita({ ...cita, nombre: e.target.value })}
            style={{ marginBottom: "10px" }}
