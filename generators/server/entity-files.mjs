/**
 * Copyright 2019-2023 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {
  javaMainPackageTemplatesBlock,
  javaTestPackageTemplatesBlock,
  moveToJavaEntityPackageSrcDir,
} from 'generator-jhipster/generators/java/support';

const TEST_DIR = 'src/test/';

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */
export const entityFiles = {
  domain: [
    javaMainPackageTemplatesBlock({
      condition: generator =>
        !generator.reactive && generator.databaseTypeSql && generator.prodDatabaseTypePostgresql && generator.fieldsContainImageBlob,
      relativePath: '_entityPackage_/',
      templates: ['domain/_PersistClass_.java.jhi.micronaut'],
    }),
    javaMainPackageTemplatesBlock({
      relativePath: '_entityPackage_/',
      templates: ['domain/_PersistClass_.java.jhi', 'domain/_PersistClass_.java.jhi.javax_validation'],
    }),
    javaMainPackageTemplatesBlock({
      condition: generator => generator.databaseTypeSql && !generator.reactive,
      relativePath: '_entityPackage_/',
      templates: ['domain/_PersistClass_.java.jhi.javax_persistence'],
    }),
    javaMainPackageTemplatesBlock({
      condition: generator => generator.databaseTypeSql && !generator.reactive && generator.enableHibernateCache,
      relativePath: '_entityPackage_/',
      templates: ['domain/_PersistClass_.java.jhi.hibernate_cache'],
    }),
    javaTestPackageTemplatesBlock({
      relativePath: '_entityPackage_/',
      templates: ['domain/_PersistClass_Test.java'],
    }),
  ],
  server: [
    javaMainPackageTemplatesBlock({
      relativePath: '_entityPackage_/',
      templates: ['repository/_EntityClass_Repository.java', 'web/rest/_EntityClass_Resource.java'],
    }),
    javaMainPackageTemplatesBlock({
      condition: generator => generator.jpaMetamodelFiltering,
      relativePath: '_entityPackage_/',
      templates: ['service/dto/_EntityClass_Criteria.java', 'service/_EntityClass_QueryService.java'],
    }),
    javaMainPackageTemplatesBlock({
      condition: generator => generator.searchEngine === 'elasticsearch',
      relativePath: '_entityPackage_/',
      templates: ['repository/search/_EntityClass_SearchRepository.java'],
    }),
    javaMainPackageTemplatesBlock({
      condition: generator => generator.reactive && ['mongodb', 'cassandra', 'couchbase'].includes(generator.databaseType),
      relativePath: '_entityPackage_/',
      templates: ['repository/reactive/_EntityClass_ReactiveRepository.java'],
    }),
    javaMainPackageTemplatesBlock({
      condition: generator => generator.service === 'serviceImpl',
      relativePath: '_entityPackage_/',
      templates: ['service/_EntityClass_Service.java', 'service/impl/_EntityClass_ServiceImpl.java'],
    }),
    javaMainPackageTemplatesBlock({
      condition: generator => generator.service === 'serviceClass',
      relativePath: '_entityPackage_/',
      renameTo: (_ctx, file) => file.replace('Impl.java', '.java').replace('/impl/', '/'),
      templates: ['service/impl/_EntityClass_ServiceImpl.java'],
    }),
  ],
  mapstruct: [
    javaMainPackageTemplatesBlock({
      condition: generator => generator.dto === 'mapstruct',
      relativePath: '_entityPackage_/',
      templates: ['service/dto/_DtoClass_.java', 'service/mapper/_EntityClass_Mapper.java'],
    }),
    javaMainPackageTemplatesBlock({
      condition: generator => generator.dto === 'mapstruct',
      templates: ['service/mapper/EntityMapper.java'],
    }),
    javaTestPackageTemplatesBlock({
      condition: generator => generator.dto === 'mapstruct',
      relativePath: '_entityPackage_/',
      templates: ['service/dto/_DtoClass_Test.java'],
    }),
    javaTestPackageTemplatesBlock({
      condition: generator =>
        generator.dto === 'mapstruct' &&
        (generator.databaseTypeSql || generator.databaseType === 'mongodb' || generator.databaseType === 'couchbase'),
      relativePath: '_entityPackage_/',
      templates: ['service/mapper/_EntityClass_MapperTest.java'],
    }),
  ],
  test: [
    javaTestPackageTemplatesBlock({
      // TODO: add test for reactive
      condition: generator => !generator.reactive,
      relativePath: '_entityPackage_/',
      templates: ['web/rest/_EntityClass_ResourceIT.java'],
    }),
    javaTestPackageTemplatesBlock({
      condition: generator => generator.searchEngine === 'elasticsearch',
      relativePath: '_entityPackage_/',
      templates: ['repository/search/_EntityClass_SearchRepositoryMockConfiguration.java'],
    }),
    {
      condition: generator => generator.gatlingTests,
      path: TEST_DIR,
      relativePath: '_entityPackage_/',
      templates: ['gatling/user-files/simulations/_EntityClass_GatlingTest.scala'],
    },
  ],
};
