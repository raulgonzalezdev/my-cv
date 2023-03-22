import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdSave,
  MdCode,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
  MdFormatSize
} from 'react-icons/md'
import { stateToHTML } from 'draft-js-export-html'

import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertFromHTML
} from 'draft-js'
import 'draft-js/dist/Draft.css'

const createEditorStateFromHtml = html => {
  try {
    const blocksFromHTML = convertFromHTML(html)
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    )
    return EditorState.createWithContent(contentState)
  } catch (error) {
    console.error('Error al convertir el HTML:', error)
    return EditorState.createEmpty()
  }
}

const editorStateToHtml = editorState => {
  const contentState = editorState.getCurrentContent()
  return stateToHTML(contentState)
}

const EnhancedContentEditable = ({
  html,
  disabled,
  onChange,
  onSave,
  minHeight,
  ...props
}) => {
  const [showEditorFunctions, setShowEditorFunctions] = useState(false)

  const [editorState, setEditorState] = useState(() =>
    createEditorStateFromHtml(html)
  )

  const handleEditorChange = newEditorState => {
    setEditorState(newEditorState)

    const contentHtml = editorStateToHtml(newEditorState)
    onChange({ target: { value: contentHtml } })
  }

  const handleEditorFocus = () => {
    setShowEditorFunctions(true)
  }

  const handleEditorBlur = () => {
    setShowEditorFunctions(false)
  }

  const editorContainerStyle = {
    minHeight: minHeight || '1rem',
    border: showEditorFunctions ? '1px solid #ccc' : 'none',
    padding: showEditorFunctions ? '4px' : '0',
    borderRadius: '4px'
  }

  const iconStyle = {
    fontSize: '18px', // Ajusta el tamaño de los íconos
    margin: '2px' // Añade espacio alrededor de los íconos
  }

  const handleKeyCommand = (command, newEditorState) => {
    const newState = RichUtils.handleKeyCommand(newEditorState, command)
    if (newState) {
      handleEditorChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  const toggleInlineStyle = event => {
    event.preventDefault()
    const style = event.currentTarget.getAttribute('data-style')
    if (style === 'SAVE') {
      onSave()
    } else {
      handleEditorChange(RichUtils.toggleInlineStyle(editorState, style))
    }
  }

  const toggleBlockType = event => {
    event.preventDefault()
    const blockType = event.currentTarget.getAttribute('data-block-type')
    handleEditorChange(RichUtils.toggleBlockType(editorState, blockType))
  }

  const ReadOnlyContent = ({ html }) => {
    const editorState = createEditorStateFromHtml(html)
    const contentHtml = editorStateToHtml(editorState)

    return (
      <div
        dangerouslySetInnerHTML={{ __html: contentHtml }}
        style={{ minHeight: '1rem' }}
        {...props}
      />
    )
  }

  return (
    <div style={editorContainerStyle} {...props}>
      {!disabled && showEditorFunctions && (
        <Box display="flex" justifyContent="space-between" width="25%">
          <MdFormatBold
            onMouseDown={toggleInlineStyle}
            data-style="BOLD"
            cursor="pointer"
            style={iconStyle}
          />
          <MdFormatItalic
            onMouseDown={toggleInlineStyle}
            data-style="ITALIC"
            cursor="pointer"
            style={iconStyle}
          />
          <MdFormatUnderlined
            onMouseDown={toggleInlineStyle}
            data-style="UNDERLINE"
            cursor="pointer"
            style={iconStyle}
          />
          <MdSave
            onMouseDown={onSave}
            data-style="SAVE"
            cursor="pointer"
            style={iconStyle}
          />
          <MdCode
            onMouseDown={toggleInlineStyle}
            data-style="CODE"
            cursor="pointer"
            style={iconStyle}
          />
          <MdFormatAlignLeft
            onMouseDown={toggleBlockType}
            data-block-type="unstyled"
            cursor="pointer"
          />
          <MdFormatAlignCenter
            onMouseDown={toggleBlockType}
            data-block-type="CENTER"
            cursor="pointer"
            style={iconStyle}
          />
          <MdFormatAlignRight
            onMouseDown={toggleBlockType}
            data-block-type="right"
            cursor="pointer"
            style={iconStyle}
          />
          <MdFormatAlignJustify
            onMouseDown={toggleBlockType}
            data-block-type="justify"
            cursor="pointer"
            style={iconStyle}
          />
        </Box>
      )}
      {disabled ? (
        <ReadOnlyContent html={html} />
      ) : (
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          handleKeyCommand={handleKeyCommand}
          onFocus={handleEditorFocus}
          onBlur={handleEditorBlur}
          readOnly={disabled}
          {...props}
        />
      )}
    </div>
  )
}

export default EnhancedContentEditable
