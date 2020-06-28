package ru.asu.vda.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import ru.asu.vda.domain.Faculties;
import ru.asu.vda.domain.Groups;
import ru.asu.vda.repository.FacultiesRepository;
import ru.asu.vda.repository.GroupsRepository;

import java.io.IOException;
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
        String syncDtoFaculties = restTemplate.postForObject("http://m.raspisanie.asu.edu.ru/student/faculty", null, String.class);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            List<SyncDto> facultiesList = objectMapper.readValue(syncDtoFaculties, new TypeReference<List<SyncDto>>() {
            });
            facultiesList.forEach(syncDto -> {
                Faculties faculties = new Faculties();
                faculties.setNameFaculty(syncDto.name);
                if (facultiesRepository.existsByNameFaculty(syncDto.name)) {
                    facultiesRepository.save(faculties);
                }
                try {
                    HttpHeaders headers = new HttpHeaders();
                    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
                    MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
                    map.add("id_spec", syncDto.id);
                    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
                    String syncDtoGroups = restTemplate.postForObject("http://m.raspisanie.asu.edu.ru/student/specialty", request, String.class);
                    List<SyncDto> groupsList = objectMapper.readValue(syncDtoGroups, new TypeReference<List<SyncDto>>() {
                    });
                    groupsList.forEach(gr -> {
                        Groups group = new Groups().faculty(faculties).nameGroup(gr.name);
                        if (groupsRepository.existsByNameGroup(gr.name)) {
                            groupsRepository.save(group);
                        }
                    });
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });

        } catch (IOException e) {
            e.printStackTrace();
        }
//        facultiesRepository.deleteAll();
//        groupsRepository.deleteAll();
        return ResponseEntity.ok().build();
    }

    private static class SyncDto {
        @JsonProperty("id")
        private String id;

        @JsonProperty("name")
        private String name;
    }
}
