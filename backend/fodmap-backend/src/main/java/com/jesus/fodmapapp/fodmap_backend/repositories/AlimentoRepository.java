package com.jesus.fodmapapp.fodmap_backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.jesus.fodmapapp.fodmap_backend.entities.Alimento;

@CrossOrigin(origins = "http://localhost:5173")
@RepositoryRestResource(path = "alimento")
public interface AlimentoRepository extends CrudRepository<Alimento, String>{

}