package com.jesus.fodmapapp.fodmap_backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.jesus.fodmapapp.fodmap_backend.entities.Alimento;

@CrossOrigin(origins = {"https://www.tufodmap.com/", "https://fodmap-app.vercel.app/", "https://fodmap-app-ortizzxzs-projects.vercel.app/", "https://fodmap-app-git-main-ortizzxzs-projects.vercel.app/"})
@RepositoryRestResource(path = "alimento")
public interface AlimentoRepository extends CrudRepository<Alimento, String>{

}