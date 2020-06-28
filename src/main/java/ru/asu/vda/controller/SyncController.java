package ru.asu.vda.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import ru.asu.vda.repository.FacultiesRepository;
import ru.asu.vda.repository.GroupsRepository;

import java.util.List;

@RestController
@RequestMapping("/api/sync")
public class SyncController {
    private final FacultiesRepository facultiesRepository;
    private final GroupsRepository groupsRepository;
    private final RestTemplate restTemplate;


    public SyncController(FacultiesRepository facultiesRepository, GroupsRepository groupsRepository, RestTemplate restTemplate) {
        this.facultiesRepository = facultiesRepository;
        this.groupsRepository = groupsRepository;
        this.restTemplate = restTemplate;
    }

    @PostMapping("/faculties")
    public ResponseEntity syncFaculties() {
        String  syncDtoList = restTemplate.postForObject("http://m.raspisanie.asu.edu.ru/student/faculty", null, String.class);
        System.out.println(syncDtoList);
//        facultiesRepository.deleteAll();
//        groupsRepository.deleteAll();
        return ResponseEntity.ok().build();
    }

    private static class SyncDtoList {
        private List<SyncDto> list;
    }

    private static class SyncDto {
        @JsonProperty("id")
        private String id;

        @JsonProperty("name")
        private String name;
    }
}
