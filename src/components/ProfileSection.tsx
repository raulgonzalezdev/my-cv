import React, { useState } from "react";
import { VStack, Text, Box, Grid, useMediaQuery, useColorModeValue } from '@chakra-ui/react';
import ContentEditable from "react-contenteditable";
import { data } from '@/api/data'

const ProfileSection = ({ lang }) => {
  
  const datapersona = data;
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.50');



  const [editableData, setEditableData] = useState(datapersona);
  const handleContentChange = (e, lang, field) => {
    const newData = { ...editableData };
    newData[lang][field] = e.target.value;
    setEditableData(newData);
  };

  const content = editableData[lang];

  const saveData = () => {
    const jsonString = JSON.stringify(editableData);
    // Aquí puedes guardar el archivo JSON en el almacenamiento local o enviarlo a una API
  };

  

  return (
    <VStack spacing={4} alignItems="start" w="100%">
      <Box boxShadow="md" p="6" rounded="md" bg={bgColor} w="100%" color={textColor}>
      <ContentEditable
        tagName="span"
        html={content.name}
       onChange={(e) => handleContentChange(e, lang, "name")}
      />
        <Text fontSize="lg">{content.personalInfo.title}</Text>
        <Text>{content.personalInfo.country}</Text>
        <Text>Contactar: {content.personalInfo.contact}</Text>
        <Text>LinkedIn: {content.personalInfo.linkedin}</Text>
      </Box>

      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: isLargerThan800 ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
        }}
        gap={4}
        w="100%"
      >
    <Box boxShadow="md" p="6" rounded="md" bg={bgColor} color={textColor} w="100%">
      <Text fontWeight="bold">Extracto</Text>
      <Text whiteSpace="pre-wrap">{content.extract}</Text>
    </Box>

    <Box boxShadow="md" p="6" rounded="md" bg={bgColor} color={textColor} w="100%">
      <Text fontWeight="bold">Aptitudes principales:</Text>
      <Box as="ul" listStyleType="disc" pl={4}>
        {content.mainSkills.map((skill, index) => (
          <Text as="li" key={index}>
            {skill}
          </Text>
        ))}
      </Box>
    </Box>

    <Box boxShadow="md" p="6" rounded="md" bg={bgColor} color={textColor} w="100%">
  <Text fontWeight="bold">Experiencia:</Text>
  {content.experience.map((exp, index) => (
    <Box key={index}>
      <Text fontWeight="bold">{exp.company}</Text>
      <Text>{exp.position}</Text>
      <Text>{exp.period}</Text>
      <Text>{exp.location}</Text>
      <Text>{exp.description}</Text>
      <Text fontWeight="bold">Proyectos:</Text>
      <Box as="ul" listStyleType="disc" pl={4}>
        {exp.projects.map((project, index) => (
          <Text as="li" key={index}>
            {project.name}: {project.description}
          </Text>
        ))}
      </Box>
    </Box>
  ))}
</Box>


     <Box boxShadow="md" p="6" rounded="md" bg={bgColor} color={textColor} w="100%">
      <Text fontWeight="bold">Intereses:</Text>
      <Box as="ul" listStyleType="disc" pl={4}>
        {content.interests.map((interest, index) => (
          <Text as="li" key={index}>
            {interest}
          </Text>
        ))}
      </Box>
    </Box>

    <Box boxShadow="md" p="6" rounded="md" bg={bgColor} color={textColor} w="100%">
      <Text fontWeight="bold">Certificaciones:</Text>
      <Box as="ul" listStyleType="disc" pl={4}>
        <Text as="li">Certificación AWS Solutions Architect - Associate</Text>
        <Text as="li">Certificación Scrum Master</Text>
        <Text as="li">Certificación Microsoft Azure Developer</Text>
      </Box>
    </Box>
  </Grid>
</VStack>

);
};

export default ProfileSection;
