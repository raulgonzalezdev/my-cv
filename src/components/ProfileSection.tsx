import React, { useEffect, useRef, useState } from 'react'
import { VStack, Text, Box, Button, Grid, useMediaQuery, useColorModeValue } from '@chakra-ui/react'

import EnhancedContentEditable from './EnhancedContentEditable'
import { data } from '../api/data'
import Header from '../components/Header'

const ProfileSection = ({ lang, editable }) => {
  const datapersona = data
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
  const bgColor = useColorModeValue('white', 'gray.700')
  const textColor = useColorModeValue('gray.700', 'gray.50')

  const [editableData, setEditableData] = useState(datapersona)

  const [saved, setSaved] = useState(false)

  const editorRef = useRef(null);
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
      alert('Hubo un error al guardar los datos. Por favor, inténtalo de nuevo.')
    }
  }

  const renderSectionContent = (section, fieldPath) =>
    section.map((item, index) => (
      <EnhancedContentEditable
        onSave={saveData}
        ref={editorRef} 
        key={index}
        html={item}
        editable={editable}
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
      <Box key={section.title} boxShadow="md" p="6" rounded="md" bg={bgColor} color={textColor} w="100%">
        <Text fontWeight="bold">{section.title}:</Text>
        <Box as="ul" listStyleType="disc" pl={4}>
          {renderSectionContent(section.content, section.fieldPath)}
        </Box>
      </Box>
    ))


  return (
    <Box w="100%">
      <VStack spacing={4} alignItems="start" w="100%">
        <Box boxShadow="md" p="6" rounded="md" bg={bgColor} w="100%" color={textColor}>
          <EnhancedContentEditable
            onSave={saveData}
            ref={editorRef} 
            editable={editable}
            html={content.personalInfo.name}
            className="contentEditable-xl font-weight-bold"
            onChange={e => handleContentChange(e, lang, `personalInfo.name`)}
          />

          <EnhancedContentEditable
            onSave={saveData}
            ref={editorRef} 
            editable={editable}
            html={content.personalInfo.title}
            className="contentEditable-lg"
            onChange={e => handleContentChange(e, lang, `personalInfo.title`)}
          />
          <EnhancedContentEditable
            onSave={saveData}
            ref={editorRef} 
            editable={editable}
            html={content.personalInfo.country}
            className="contentEditable-lg"
            onChange={e => handleContentChange(e, lang, `personalInfo.country`)}
          />

          <Text>
            Contactar:
            <EnhancedContentEditable
              onSave={saveData}
              ref={editorRef} 
              editable={editable}
              html={content.personalInfo.contact}
              className="contentEditable-lg"
              onChange={e => handleContentChange(e, lang, `personalInfo.contact`)}
            />
          </Text>
          <Text>
            LinkedIn:
            <EnhancedContentEditable
              onSave={saveData}
              ref={editorRef} 
              editable={editable}
              html={content.personalInfo.linkedin}
              className="contentEditable-lg"
              onChange={e => handleContentChange(e, lang, `personalInfo.linkedin`)}
            />
          </Text>
        </Box>

        <Box boxShadow="md" p="6" rounded="md" bg={bgColor} color={textColor} w="100%">
          <Text fontWeight="bold">Extracto</Text>
          <EnhancedContentEditable
            html={content.extract}
            editable={editable}
            onSave={saveData}
            onChange={e => handleContentChange(e, lang, 'extract')}
            className="contentEditable-pre-wrap"
            ref={editorRef} 
          />
        </Box>

        <Box boxShadow="md" p="6" rounded="md" bg={bgColor} color={textColor} w="100%">
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
            <Box boxShadow="md" p="6" rounded="md" bg={bgColor} color={textColor} w="100%" key={index}>
              <EnhancedContentEditable
                html={exp.company}
                index={index}
                editable={editable}
                onSave={saveData}
                onChange={e => handleContentChange(e, lang, 'experience.company')}
                className="contentEditable-xl font-weight-bold"
                ref={editorRef} 
              />
              <EnhancedContentEditable
                html={exp.position}
                index={index}
                editable={editable}
                onSave={saveData}
                onChange={e => handleContentChange(e, lang, 'experience.position')}
                className="contentEditable-pre-wrap"
                ref={editorRef} 
              />
              <EnhancedContentEditable
                html={exp.period}
                index={index}
                editable={editable}
                onSave={saveData}
                onChange={e => handleContentChange(e, lang, 'experience.period')}
                className="contentEditable-pre-wrap"
                ref={editorRef} 
              />
              <EnhancedContentEditable
                html={exp.location}
                index={index}
                editable={editable}
                onSave={saveData}
                onChange={e => handleContentChange(e, lang, 'experience.location')}
                className="contentEditable-pre-wrap"
                ref={editorRef} 
              />
              <EnhancedContentEditable
                html={exp.description}
                index={index}
                editable={editable}
                onSave={saveData}
                onChange={e => handleContentChange(e, lang, 'experience.description')}
                className="contentEditable-pre-wrap"
                ref={editorRef} 
              />

              <Text fontWeight="bold">Proyectos:</Text>
              <Box as="ul" listStyleType="disc" pl={4}>
                {exp.projects.map((project, projIndex) => (
                  <li key={projIndex}>
                    <EnhancedContentEditable
                      html={project.name}
                      index={projIndex}
                      editable={editable}
                      onSave={saveData}
                      onChange={e => handleContentChange(e, lang, `projects.${projIndex}.name`)}
                      className="contentEditable-pre-wrap"
                      ref={editorRef} 
                    />

                    <EnhancedContentEditable
                      html={project.description}
                      index={projIndex}
                      editable={editable}
                      onSave={saveData}
                      onChange={e => handleContentChange(e, lang, `projects.${projIndex}.description`)}
                      className="contentEditable-pre-wrap"
                      ref={editorRef} 
                    />
                  </li>
                ))}
              </Box>
            </Box>
          ))}
        </Grid>

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
