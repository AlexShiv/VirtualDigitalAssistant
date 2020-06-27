package ru.asu.vda.service;

import org.deeplearning4j.models.word2vec.Word2Vec;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.cpu.nativecpu.NDArray;
import org.nd4j.linalg.factory.NDArrayFactory;
import org.springframework.stereotype.Service;
import ru.asu.vda.service.dto.Dialog;

import javax.cache.Cache;
import javax.cache.CacheManager;
import java.util.Arrays;
import java.util.stream.Collectors;

@Service
public class BotService {
    private final Word2Vec word2Vec;
    private final MultiLayerNetwork network;
    private final NDArrayFactory arrayFactory;
    private final CacheManager cacheManager;

    public BotService(Word2Vec word2Vec, MultiLayerNetwork network, NDArrayFactory arrayFactory, CacheManager cacheManager) {
        this.word2Vec = word2Vec;
        this.network = network;
        this.arrayFactory = arrayFactory;
        this.cacheManager = cacheManager;
    }

    public Dialog askBot(String message) {
        Cache<String, NDArray> unknownWords = cacheManager.getCache("unknownWords", String.class, NDArray.class);
        INDArray question = arrayFactory.average(
            Arrays.stream(message.split(" "))
                .map(word -> word.replaceAll("[,.?!\\\\/*@#$%^&()]", ""))
                .map(word -> checkArray(word, word2Vec.getWordVectorMatrix(word), unknownWords))
                .collect(Collectors.toList())
        );
        INDArray output = network.output(question);
        return new Dialog(output.toString());
    }

    private INDArray checkArray(String word, INDArray wordVector, Cache<String, NDArray> unknownWords) {
        if (unknownWords.containsKey(word)) {
            return unknownWords.get(word);
        }
        if (wordVector == null) {
            NDArray indArray = (NDArray) arrayFactory.rand(1, 100);
            unknownWords.put(word, indArray);
        }
        return wordVector;
    }
}
