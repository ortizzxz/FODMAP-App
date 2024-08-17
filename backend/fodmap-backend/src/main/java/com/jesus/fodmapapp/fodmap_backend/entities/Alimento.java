package com.jesus.fodmapapp.fodmap_backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "alimento")
public class Alimento {

    @Id
    private String nombre; // Ahora es solo un campo String sin @GeneratedValue

    private String tipo;
    private String grupo;
    private String indice;
    
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public String getGrupo() {
        return grupo;
    }
    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }
    public String getIndice() {
        return indice;
    }
    public void setIndice(String indice) {
        this.indice = indice;
    }
}