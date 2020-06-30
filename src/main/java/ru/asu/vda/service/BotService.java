package ru.asu.vda.service;

import org.deeplearning4j.models.word2vec.Word2Vec;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.cpu.nativecpu.NDArray;
import org.nd4j.linalg.factory.NDArrayFactory;
import org.springframework.stereotype.Service;
import ru.asu.vda.domain.StatPopularCategories;
import ru.asu.vda.repository.StatPopularCategoriesRepository;
import ru.asu.vda.service.dto.Dialog;

import javax.cache.Cache;
import javax.cache.CacheManager;
import java.util.Arrays;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BotService {
    private final Word2Vec word2Vec;
    private final MultiLayerNetwork network;
    private final NDArrayFactory arrayFactory;
    private final CacheManager cacheManager;
    private final StatPopularCategoriesRepository popularCategoriesRepository;

    public BotService(Word2Vec word2Vec, MultiLayerNetwork network, NDArrayFactory arrayFactory, CacheManager cacheManager, StatPopularCategoriesRepository popularCategoriesRepository) {
        this.word2Vec = word2Vec;
        this.network = network;
        this.arrayFactory = arrayFactory;
        this.cacheManager = cacheManager;
        this.popularCategoriesRepository = popularCategoriesRepository;
    }

    public Dialog askBot(String message) {
        Cache<String, NDArray> unknownWords = cacheManager.getCache("unknownWords", String.class, NDArray.class);
        INDArray question = arrayFactory.average(
            Arrays.stream(message.split(" "))
                .map(word -> word.replaceAll("[,.?!\\\\/*@#$%^&()]", ""))
                .map(word -> checkArray(word, word2Vec.getWordVectorMatrix(word), unknownWords))
                .collect(Collectors.toList())
        );
        double[] output = network.output(question).toDoubleVector();
        double maxDouble = Arrays.stream(output).max().getAsDouble();
        int i;
        for (i = 0; i < output.length; i++) {
            if (output[i] == maxDouble) {
                break;
            }
        }

        return new Dialog(getAnswerByIndex(i));
    }

    private String getAnswerByIndex(int i) {
        StatPopularCategories statPopularCategories = new StatPopularCategories();
        Optional<StatPopularCategories> category;
        switch (i) {
            // приветствие
            case 0:
                category = popularCategoriesRepository.findByNameCategory("Приветствие");
                if (!category.isPresent()) {
                    statPopularCategories.setCountAnswers(1L);
                    statPopularCategories.setNameCategory("Приветствие");
                }
                else {
                    statPopularCategories.setCountAnswers(category.get().getCountAnswers() + 1);
                }
                popularCategoriesRepository.save(statPopularCategories);
                return "привет, мой друг";
            // прощание
            case 1:
                category = popularCategoriesRepository.findByNameCategory("Довстречи");
                if (!category.isPresent()) {
                    statPopularCategories.setCountAnswers(1L);
                    statPopularCategories.setNameCategory("Довстречи");
                }
                else {
                    statPopularCategories.setCountAnswers(category.get().getCountAnswers() + 1);
                }
                popularCategoriesRepository.save(statPopularCategories);
                return "хорошего дня";
            // расписание
            case 2:
                category = popularCategoriesRepository.findByNameCategory("Расписание");
                if (!category.isPresent()) {
                    statPopularCategories.setCountAnswers(1L);
                    statPopularCategories.setNameCategory("Расписание");
                }
                else {
                    statPopularCategories.setCountAnswers(category.get().getCountAnswers() + 1);
                }
                popularCategoriesRepository.save(statPopularCategories);
                return "Расписание вы можете посмотреть -> http://raspisanie.asu.edu.ru/student";
            // корпуса
            case 3:
                category = popularCategoriesRepository.findByNameCategory("Корпуса");
                if (!category.isPresent()) {
                    statPopularCategories.setCountAnswers(1L);
                    statPopularCategories.setNameCategory("Корпуса");
                }
                else {
                    statPopularCategories.setCountAnswers(category.get().getCountAnswers() + 1);
                }
                popularCategoriesRepository.save(statPopularCategories);
                return "Местоположение корпусов -> http://asu.edu.ru/universitet/474-mestopolojenie-korpusov.html";
            // инфо
            case 4:
                category = popularCategoriesRepository.findByNameCategory("Инфо");
                if (!category.isPresent()) {
                    statPopularCategories.setCountAnswers(1L);
                    statPopularCategories.setNameCategory("Инфо");
                }
                else {
                    statPopularCategories.setCountAnswers(category.get().getCountAnswers() + 1);
                }
                popularCategoriesRepository.save(statPopularCategories);
                return "Контактная информация: ЮРИДИЧЕСКИЙ АДРЕС: 414056, Россия, г. Астрахань, ул. Татищева, 20а, Астраханский государственный университет. Телефоны: 8 (8512) 24-64-00. Факс: 8 (8512) 24-68-64. E-mail: asu@asu.edu.ru. Приёмная комиссия: Телефоны: 8 (8512) 24-64-07, 8 (8512) 24-64-08, 8 (8512) 24-64-09. E-mail: metodika@asu.edu.ru. Более подробно –> http://asu.edu.ru/universitet/5-kontaktnaia-informaciia.html";
            // помощь
            case 5:
                category = popularCategoriesRepository.findByNameCategory("Помощь");
                if (!category.isPresent()) {
                    statPopularCategories.setCountAnswers(1L);
                    statPopularCategories.setNameCategory("Помощь");
                }
                else {
                    statPopularCategories.setCountAnswers(category.get().getCountAnswers() + 1);
                }
                return "Отдел интернет-технологий по номеру телефона: 24-64-59 \r\n Проблемы с пропуском: ТП кабинет 905";
            // новости
            case 6:
                category = popularCategoriesRepository.findByNameCategory("Новости");
                if (!category.isPresent()) {
                    statPopularCategories.setCountAnswers(1L);
                    statPopularCategories.setNameCategory("Новости");
                }
                else {
                    statPopularCategories.setCountAnswers(category.get().getCountAnswers() + 1);
                }
                return "Узнать последние новости можно соответствующем разделе мобильного приложения или по адресу -> http://asu.edu.ru/news/42-catalog-news.html";
            // соцсети
            case 7:
                category = popularCategoriesRepository.findByNameCategory("Соцсети");
                if (!category.isPresent()) {
                    statPopularCategories.setCountAnswers(1L);
                    statPopularCategories.setNameCategory("Соцсети");
                }
                else {
                    statPopularCategories.setCountAnswers(category.get().getCountAnswers() + 1);
                }
                return "Социальные сети: vk - https://vk.com/asu_edu_ru , instagram - https://www.instagram.com/agu_astrakhan30/ , facebook - https://www.facebook.com/asu30/ , одноклассники - https://ok.ru/asu.edu30?st._aid=ExternalGroupWidget_OpenGroup";
            // график работы
            case 8:
                category = popularCategoriesRepository.findByNameCategory("График работы");
                if (!category.isPresent()) {
                    statPopularCategories.setCountAnswers(1L);
                    statPopularCategories.setNameCategory("График работы");
                }
                else {
                    statPopularCategories.setCountAnswers(category.get().getCountAnswers() + 1);
                }
                return "Основные структурные подразделения АГУ работают понедеьник-пятница с 09:00-17:30(12:30-13:00 обед)";
            // кафедра информационных технологий
            case 9:
                category = popularCategoriesRepository.findByNameCategory("Кафедра ИТ");
                if (!category.isPresent()) {
                    statPopularCategories.setCountAnswers(1L);
                    statPopularCategories.setNameCategory("Кафедра ИТ");
                }
                else {
                    statPopularCategories.setCountAnswers(category.get().getCountAnswers() + 1);
                }
                return "Направления подготовки, реализуемые кафедрой информационных\n" +
                    "технологий в 2020–2021 учебном году\n" +
                    "Аспирантура\n" +
                    "27.06.01 Управление в технических системах\n" +
                    "Профили:\n" +
                    "\uF0B7 Управление в социальных и экономических системах (очная, заочная\n" +
                    "форма обучения).\n" +
                    "\uF0B7 Информационно-измерительные и управляющие системы (в научных\n" +
                    "исследованиях) (очная, заочная форма обучения).\n" +
                    "\uF0B7 Математическое моделирование, численные методы и комплексы\n" +
                    "программ (очная, заочная форма обучения).\n" +
                    "Магистратура\n" +
                    "09.04.02. Информационные системы и технологии\n" +
                    "Профили:\n" +
                    "\uF0B7 «Управление данными» (очная, очно-заочная форма обучения).\n" +
                    "\uF0B7 «Прикладные информационные технологии».\n" +
                    "Бакалавриат (очная, очно-заочная форма обучения):\n" +
                    "\uF0B7 09.03.01 Информатика и вычислительная техника (очная, очно-заочная\n" +
                    "форма обучения).\n" +
                    "\uF0B7 09.03.02 Информационные системы и технологии (очная, очно-заочная\n" +
                    "форма обучения).";
            default:
                return "Пожалуйста, переформулируйте вопрос";
        }
    }

    private INDArray checkArray(String word, INDArray wordVector, Cache<String, NDArray> unknownWords) {
        if (unknownWords.containsKey(word)) {
            return unknownWords.get(word);
        }
        if (wordVector == null) {
            NDArray indArray = (NDArray) arrayFactory.rand(1, 300);
            unknownWords.put(word, indArray);
        }
        return wordVector;
    }

}
