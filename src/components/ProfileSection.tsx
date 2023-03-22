import React, { useEffect, useState } from 'react'
import {
  VStack,
  Text,
  Box,
  Button,
  Grid,
  useMediaQuery,
  useColorModeValue
} from '@chakra-ui/react'

import EnhancedContentEditable from './EnhancedContentEditable'
import { data } from '../api/data'

const ProfileSection = ({ lang, editable }) => {
  const datapersona = data
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
  const bgColor = useColorModeValue('white', 'gray.700')
  const textColor = useColorModeValue('gray.700', 'gray.50')

  const [editableData, setEditableData] = useState(datapersona)

  const [saved, setSaved] = useState(false)

  const handleContentChange = (e, lang, field) => {
    const newData = { ...editableData }

    const setNestedProperty = (obj, path, value) => {
      if (path.length === 1) {
        obj[path[0]] = value
      } else {
        const [head, ...tail] = path
        if (!obj[head]) obj[head] = {}
        setNestedProperty(obj[head], tail, value)
      }
    }

    setNestedProperty(newData, [lang, ...field.split('.')], e.target.value)
    setEditableData(newData)
  }

  useEffect(() => {
    const savedData = localStorage.getItem('cvData')
    if (savedData) {
      setEditableData(JSON.parse(savedData))
    } else {
      setEditableData(datapersona)
    }
  }, [])

  useEffect(() => {
    if (saved) {
      const jsonString = JSON.stringify(editableData)
      localStorage.setItem('cvData', jsonString)
      setSaved(false)
    }
  }, [saved, editableData])

  const content = editableData[lang]

  const saveData = () => {
    try {
      const jsonString = JSON.stringify(editableData)
      localStorage.setItem('cvData', jsonString)
      setSaved(true)
      alert('¡Datos guardados exitosamente!')
    } catch (error) {
      console.error('Error al guardar datos:', error)
      alert(
        'Hubo un error al guardar los datos. Por favor, inténtalo de nuevo.'
      )
    }
  }

  const renderSectionContent = (section, fieldPath) =>
    section.map((item, index) => (
      <EnhancedContentEditable
        onSave={saveData}
        minHeight="1rem"
        key={index}
        tagName="span"
        html={item}
        disabled={!editable}
        onChange={e => handleContentChange(e, lang, `${fieldPath}.${index}`)}
        className="contentEditable-pre-wrap"
      />
    ))

  const sections = [
    {
      title: 'Certificaciones',
      content: content.certificates,
      fieldPath: 'certificates'
    },
    {
      title: 'Aptitudes principales',
      content: content.mainSkills,
      fieldPath: 'mainSkills'
    },
    {
      title: 'Intereses',
      content: content.interests,
      fieldPath: 'interests'
    }
  ]

  const renderSections = () =>
    sections.map(section => (
      <Box
        key={section.title}
        boxShadow="md"
        p="6"
        rounded="md"
        bg={bgColor}
        color={textColor}
        w="100%"
      >
        <Text fontWeight="bold">{section.title}:</Text>
        <Box as="ul" listStyleType="disc" pl={4}>
          {renderSectionContent(section.content, section.fieldPath)}
        </Box>
      </Box>
    ))

  return (
    <Box w="100%">
      <VStack spacing={4} alignItems="start" w="100%">
        <Box
          boxShadow="md"
          p="6"
          rounded="md"
          bg={bgColor}
          w="100%"
          color={textColor}
        >
          <EnhancedContentEditable
            tagName="span"
            html={content.personalInfo.name}
            disabled={!editable}
            onSave={saveData}
            onChange={e => handleContentChange(e, lang, 'personalInfo.name')}
            className="contentEditable-xl font-weight-bold"
            minHeight="1rem"
          />

          <EnhancedContentEditable
            onSave={saveData}
            minHeight="1rem"
            tagName="span"
            html={content.personalInfo.title}
            disabled={!editable}
            onChange={e => handleContentChange(e, lang, 'personalInfo.title')}
            className="contentEditable-lg"
          />
          <EnhancedContentEditable
            onSave={saveData}
            minHeight="1rem"
            tagName="span"
            html={content.personalInfo.country}
            disabled={!editable}
            onChange={e => handleContentChange(e, lang, 'personalInfo.country')}
            className="contentEditable-lg"
          />

          <Text>
            Contactar:
            <EnhancedContentEditable
              onSave={saveData}
              minHeight="1rem"
              tagName="span"
              html={content.personalInfo.contact}
              disabled={!editable}
              onChange={e =>
                handleContentChange(e, lang, 'personalInfo.contact')
              }
              className="contentEditable-lg"
            />
          </Text>
          <Text>
            LinkedIn:
            <EnhancedContentEditable
              onSave={saveData}
              minHeight="1rem"
              tagName="span"
              html={content.personalInfo.linkedin}
              disabled={!editable}
              onChange={e =>
                handleContentChange(e, lang, 'personalInfo.linkedin')
              }
              className="contentEditable-lg"
            />
          </Text>
        </Box>

        <Box
          boxShadow="md"
          p="6"
          rounded="md"
          bg={bgColor}
          color={textColor}
          w="100%"
        >
          <Text fontWeight="bold">Extracto</Text>
          <EnhancedContentEditable
            tagName="span"
            html={content.extract}
            disabled={!editable}
            onSave={saveData}
            onChange={e => handleContentChange(e, lang, 'extract')}
            className="contentEditable-pre-wrap "
            minHeight="1rem"
          />
        </Box>

        <Box
          boxShadow="md"
          p="6"
          rounded="md"
          bg={bgColor}
          color={textColor}
          w="100%"
        >
          {' '}
          <Text fontWeight="bold">Experiencia:</Text>
        </Box>

        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)'
          }}
          gap={4}
          w="100%"
          boxShadow="md"
          p="6"
          rounded="md"
          bg={bgColor}
          color={textColor}
        >
          
          {content.experience.map((exp, index) => (
            <Box
              boxShadow="md"
              p="6"
              rounded="md"
              bg={bgColor}
              color={textColor}
              w="100%"
            >
              <EnhancedContentEditable
                onSave={saveData}
                minHeight="1rem"
                tagName="span"
                html={exp.company}
                disabled={!editable}
                onChange={e =>
                  handleContentChange(e, lang, `experience.${index}.company`)
                }
                className="contentEditable-xl font-weight-bold"
              />
              <EnhancedContentEditable
                onSave={saveData}
                minHeight="1rem"
                tagName="span"
                html={exp.position}
                disabled={!editable}
                onChange={e =>
                  handleContentChange(e, lang, `experience.${index}.position`)
                }
              />

              <EnhancedContentEditable
                onSave={saveData}
                minHeight="1rem"
                tagName="span"
                html={exp.period}
                disabled={!editable}
                onChange={e =>
                  handleContentChange(e, lang, `experience.${index}.period`)
                }
              />
              <EnhancedContentEditable
                onSave={saveData}
                minHeight="1rem"
                tagName="span"
                html={exp.location}
                disabled={!editable}
                onChange={e =>
                  handleContentChange(e, lang, `experience.${index}.location`)
                }
              />
              <EnhancedContentEditable
                onSave={saveData}
                minHeight="1rem"
                tagName="span"
                html={exp.description}
                disabled={!editable}
                onChange={e =>
                  handleContentChange(
                    e,
                    lang,
                    `experience.${index}.description`
                  )
                }
              />

              <Text fontWeight="bold">Proyectos:</Text>
              <Box as="ul" listStyleType="disc" pl={4}>
                {exp.projects.map((project, projIndex) => (
                  <li key={index}>
                    <EnhancedContentEditable
                      onSave={saveData}
                      minHeight="1rem"
                      key={projIndex}
                      tagName="span"
                      html={project.name}
                      disabled={!editable}
                      className="contentEditable-pre-wrap"
                      onChange={e =>
                        handleContentChange(
                          e,
                          lang,
                          `experience.${index}.projects.${projIndex}.name`
                        )
                      }
                    />
                    <EnhancedContentEditable
                      onSave={saveData}
                      minHeight="1rem"
                      key={projIndex}
                      tagName="span"
                      html={project.description}
                      disabled={!editable}
                      onChange={e =>
                        handleContentChange(
                          e,
                          lang,
                          `experience.${index}.projects.${projIndex}.description`
                        )
                      }
                      className="contentEditable-pre-wrap"
                    />
                  </li>
                ))}
              </Box>
            </Box>
          ))}
        </Grid>
        {/* </Box> */}

        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: isLargerThan800 ? '50% 50%' : 'repeat(1, 1fr)'
          }}
          gap={4}
          w="100%"
        >
          {renderSections()}

          {editable && (
            <Button
              onClick={() => {
                saveData()
                setSaved(true)
              }}
            >
              Guardar
            </Button>
          )}
        </Grid>
      </VStack>
    </Box>
  )
}

export default ProfileSection
