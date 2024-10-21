package com.jesus.fodmapapp.fodmap_backend.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class keepAliveService {
    @Autowired
    private RestTemplate restTemplate;

    @Scheduled(fixedRate = 180000) // each 5 minutes 
    public void pingMyself() {
        try{
            String url = "https://www.tufodmap.com/";

            restTemplate.getForObject(url, String.class);
        }catch(Exception e){
            System.err.println(e);
        }
    }
}
