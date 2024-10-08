/**
 * Copyright 2013-2023 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const javaxCacheApi = {
  groupId: 'javax.cache',
  artifactId: 'cache-api',
};
const hibernateJCache = {
  groupId: 'org.hibernate.orm',
  artifactId: 'hibernate-jcache',
  // TODO drop forced version. Refer to https://github.com/jhipster/generator-jhipster/issues/22579

  version: '${hibernate.version}',
};

// type CacheProviderDependencies = {
//   base: MavenDefinition;
//   hibernateCache?: MavenDefinition;
// };

export const getCacheProviderMavenDefinition = (cacheProvider, javaDependencies) => {
  const dependenciesForCache = {
    redis: {
      base: {
        dependencies: [
          {
            groupId: 'org.testcontainers',
            artifactId: 'junit-jupiter',
            scope: 'test',
          },
          {
            groupId: 'org.testcontainers',
            artifactId: 'testcontainers',
            scope: 'test',
          },
          {
            groupId: 'org.redisson',
            artifactId: 'redisson',
            version: javaDependencies.redisson,
          },
        ],
      },
      hibernateCache: {
        dependencies: [hibernateJCache],
      },
    },
    ehcache: {
      base: {
        properties: [
          { property: 'ehcache.version', value: javaDependencies.ehcache },
          { property: 'jaxb-runtime.version', value: javaDependencies['jaxb-runtime'] },
        ],
        dependencies: [
          javaxCacheApi,
          {
            groupId: 'org.ehcache',
            artifactId: 'ehcache',
            classifier: 'jakarta',
          },
          {
            groupId: 'org.glassfish.jaxb',
            artifactId: 'jaxb-runtime',
          },
        ],
        dependencyManagement: [
          {
            groupId: 'org.ehcache',
            artifactId: 'ehcache',
            classifier: 'jakarta',

            version: '${ehcache.version}',
          },
          {
            groupId: 'org.glassfish.jaxb',
            artifactId: 'jaxb-runtime',

            version: '${jaxb-runtime.version}',
          },
        ],
      },
      hibernateCache: {
        dependencies: [hibernateJCache],
      },
    },
    caffeine: {
      base: {
        properties: [
          {
            property: 'typesafe.version',
            value: javaDependencies.typesafe,
          },
        ],
        dependencies: [
          javaxCacheApi,
          {
            groupId: 'com.github.ben-manes.caffeine',
            artifactId: 'jcache',
          },
          {
            groupId: 'com.github.ben-manes.caffeine',
            artifactId: 'caffeine',
          },
          {
            groupId: 'com.typesafe',
            artifactId: 'config',

            version: '${typesafe.version}',
          },
        ],
      },
      hibernateCache: {
        dependencies: [hibernateJCache],
      },
    },
    hazelcast: {
      base: {
        properties: [
          {
            property: 'hazelcast.version',
            value: javaDependencies['hazelcast'],
          },
        ],
        dependencies: [
          javaxCacheApi,
          {
            groupId: 'com.hazelcast',
            artifactId: 'hazelcast',

            version: '${hazelcast.version}',
          },
          {
            groupId: 'io.micronaut.cache',
            artifactId: 'micronaut-cache-hazelcast',

            version: '${micronaut.cache.version}',
          },
        ],
      },
      hibernateCache: {
        properties: [
          {
            property: 'hazelcast-hibernate.version',
            value: javaDependencies['hazelcast-hibernate'],
          },
        ],
        dependencies: [
          {
            groupId: 'com.hazelcast',
            artifactId: 'hazelcast-hibernate53',

            version: '${hazelcast-hibernate.version}',
          },
        ],
      },
    },
    infinispan: {
      base: {
        dependencies: [
          javaxCacheApi,
          {
            groupId: 'org.infinispan',
            artifactId: 'infinispan-hibernate-cache-v60',
          },
          {
            groupId: 'org.infinispan',
            artifactId: 'infinispan-spring-boot3-starter-embedded',
          },
          {
            groupId: 'org.infinispan',
            artifactId: 'infinispan-commons-jakarta',
          },
          {
            groupId: 'org.infinispan',
            artifactId: 'infinispan-core-jakarta',
          },
          {
            groupId: 'org.infinispan',
            artifactId: 'infinispan-component-annotations',
            scope: 'compile',
          },
        ],
      },
    },
    memcached: {
      base: {
        dependencies: [
          javaxCacheApi,
          {
            groupId: 'com.google.code.simple-spring-memcached',
            artifactId: 'spring-cache',
          },
          {
            groupId: 'com.google.code.simple-spring-memcached',
            artifactId: 'xmemcached-provider',
          },
          {
            groupId: 'com.googlecode.xmemcached',
            artifactId: 'xmemcached',
          },
        ],
      },
    },
  };
  return dependenciesForCache[cacheProvider];
};

export const getCacheProviderGradleDefinition = (cacheProvider, javaDependencies) => {
  const dependenciesForCache = {
    hazelcast: {
      base: {
        properties: [
          {
            property: 'hazelcast.version',
            value: javaDependencies['hazelcast'],
          },
        ],
        dependencies: [
          javaxCacheApi,
          {
            groupId: 'com.hazelcast',
            artifactId: 'hazelcast',
            scope: 'implementation',

            version: '${hazelcast_version}',
          },
          {
            groupId: 'io.micronaut.cache',
            artifactId: 'micronaut-cache-hazelcast',
            scope: 'implementation',

            version: '${micronaut_cache_version}',
          },
        ],
      },
      hibernateCache: {
        properties: [
          {
            property: 'hazelcast-hibernate.version',
            value: javaDependencies['hazelcast-hibernate'],
          },
        ],
        dependencies: [
          {
            groupId: 'com.hazelcast',
            artifactId: 'hazelcast-hibernate53',
            scope: 'implementation',
            
            version: '${hazelcast_hibernate_version}',
          },
        ],
      },
    },
  };

  return dependenciesForCache[cacheProvider];
};
