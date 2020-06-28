package ru.asu.vda.config;

import org.nd4j.linalg.cpu.nativecpu.NDArray;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import javax.cache.CacheManager;
import javax.cache.Caching;
import javax.cache.configuration.MutableConfiguration;
import javax.cache.expiry.AccessedExpiryPolicy;
import javax.cache.expiry.Duration;
import javax.cache.spi.CachingProvider;
import java.util.concurrent.TimeUnit;

@Configuration
public class CacheConfig {

    @Bean("cache")
    public CacheManager getCacheManager() {
        CachingProvider cachingProvider = Caching.getCachingProvider();
        CacheManager cacheManager = cachingProvider.getCacheManager();
        MutableConfiguration<String, NDArray> configuration = new MutableConfiguration<>();
        configuration.setTypes(String.class, NDArray.class)
            .setExpiryPolicyFactory(AccessedExpiryPolicy.factoryOf(new Duration(TimeUnit.DAYS, 7L)))
            .setStatisticsEnabled(true);
        cacheManager.createCache("unknownWords", configuration);
        return cacheManager;
    }

    @Bean
    public RestTemplate getRestTemplate(){
        return new RestTemplate();
    }
}
