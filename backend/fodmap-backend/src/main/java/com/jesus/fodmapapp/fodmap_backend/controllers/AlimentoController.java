package com.jesus.fodmapapp.fodmap_backend.controllers;

import com.jesus.fodmapapp.fodmap_backend.entities.Alimento;
import com.jesus.fodmapapp.fodmap_backend.repositories.AlimentoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alimento")
@CrossOrigin(origins = {"https://www.tufodmap.com/", "https://fodmap-app.vercel.app/", "https://fodmap-app-ortizzxzs-projects.vercel.app/", "https://fodmap-app-git-main-ortizzxzs-projects.vercel.app/"})
public class AlimentoController {

    private static final Logger logger = LoggerFactory.getLogger(AlimentoController.class);

    @Autowired
    private AlimentoRepository alimentoRepository;

    @GetMapping
    public ResponseEntity<List<Alimento>> getAllAlimentos() {
        logger.info("Iniciando solicitud para obtener todos los alimentos");
        List<Alimento> alimentos = (List<Alimento>) alimentoRepository.findAll();
        logger.debug("Se obtuvieron {} alimentos", alimentos.size());
        
        for (Alimento alimento : alimentos) {
            logger.trace("Alimento: {}", alimento.getNombre());
        }
        
        logger.info("Finalizando solicitud para obtener alimentos");
        return ResponseEntity.ok()
                .header("Content-Type", "application/json;charset=UTF-8")
                .body(alimentos);
    }

    @GetMapping("/prueba")
    public ResponseEntity<String> prueba() {
        String ejemplo = "Limón";
        return ResponseEntity.ok(ejemplo);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Alimento> getAlimentoById(@PathVariable String id) {
        logger.info("Buscando alimento con id: {}", id);
        return alimentoRepository.findById(id)
                .map(alimento -> {
                    logger.debug("Alimento encontrado: {}", alimento.getNombre());
                    return ResponseEntity.ok()
                            .header("Content-Type", "application/json;charset=UTF-8")
                            .body(alimento);
                })
                .orElseGet(() -> {
                    logger.warn("Alimento con id {} no encontrado", id);
                    return ResponseEntity.notFound().build();
                });
    }

    // Puedes añadir más métodos según sea necesario
}