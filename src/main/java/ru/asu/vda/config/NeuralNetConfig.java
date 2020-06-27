package ru.asu.vda.config;

import org.deeplearning4j.models.embeddings.loader.WordVectorSerializer;
import org.deeplearning4j.models.word2vec.Word2Vec;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;
import org.nd4j.linalg.cpu.nativecpu.CpuNDArrayFactory;
import org.nd4j.linalg.factory.NDArrayFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.IOException;

@Configuration
public class NeuralNetConfig {
    @Value("${neuralnet.modelPath}")
    private String modelPath;
    @Value("${neuralnet.vectorizerPath}")
    private String vectorizerPath;

    @Bean
    public Word2Vec getWord2Vec() {
        return WordVectorSerializer.readWord2VecModel(new File(vectorizerPath));
    }

    @Bean
    public MultiLayerNetwork getMultiLayerNetwork() throws IOException {
        return MultiLayerNetwork.load(new File(modelPath), true);
    }

    @Bean
    public NDArrayFactory getArrayFactory() throws IOException {
        return new CpuNDArrayFactory();
    }
}
