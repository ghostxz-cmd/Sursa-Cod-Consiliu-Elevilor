'use client';

import { useState, useRef } from 'react';

interface AnuntEditorProps {
  onCancel: () => void;
  onSave: () => void;
}

export default function AnuntEditor({ onCancel, onSave }: AnuntEditorProps) {
  const [titlu, setTitlu] = useState('');
  const [rezumat, setRezumat] = useState('');
  const [continut, setContinut] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [imagine, setImagine] = useState('');
  const [publicat, setPublicat] = useState(false);
  const [saving, setSaving] = useState(false);
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagine(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    contentEditableRef.current?.focus();
  };

  const handleSave = async () => {
    if (!titlu.trim()) {
      alert('Te rog introdu un titlu pentru anunț!');
      return;
    }

    const continutHTML = contentEditableRef.current?.innerHTML || '';
    if (!continutHTML.trim()) {
      alert('Te rog scrie conținutul anunțului!');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch('/api/anunturi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titlu,
          continut: continutHTML,
          rezumat,
          imagine_principala: imagine,
          tags,
          publicat,
          status: publicat ? 'published' : 'draft'
        })
      });

      if (response.ok) {
        alert(publicat ? 'Anunț publicat cu succes!' : 'Anunț salvat ca draft!');
        onSave();
      } else {
        const error = await response.json();
        alert('Eroare la salvare: ' + error.error);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Eroare la salvarea anunțului');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '15px',
      padding: '40px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '35px',
        paddingBottom: '25px',
        borderBottom: '2px solid #f0f0f0'
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 800,
          color: '#1a237e',
          fontFamily: 'Montserrat, sans-serif',
          margin: 0
        }}>
          Editor Anunț
        </h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onCancel}
            disabled={saving}
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif',
              color: '#666',
              backgroundColor: '#f5f5f5',
              border: 'none',
              borderRadius: '8px',
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.5 : 1
            }}
          >
            Anulează
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif',
              color: '#fff',
              backgroundColor: publicat ? '#4caf50' : '#ff9800',
              border: 'none',
              borderRadius: '8px',
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.5 : 1
            }}
          >
            {saving ? 'Se salvează...' : (publicat ? 'Publică Anunț' : 'Salvează Draft')}
          </button>
        </div>
      </div>

      {/* Titlu */}
      <div style={{ marginBottom: '25px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: 700,
          color: '#333',
          fontFamily: 'Montserrat, sans-serif',
          marginBottom: '10px'
        }}>
          Titlu Anunț
        </label>
        <input
          type="text"
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          placeholder="Introdu titlul anunțului..."
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '16px',
            fontWeight: 600,
            fontFamily: 'Montserrat, sans-serif',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            outline: 'none',
            transition: 'border-color 0.3s ease'
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = '#1a237e'}
          onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
        />
      </div>

      {/* Rezumat */}
      <div style={{ marginBottom: '25px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: 700,
          color: '#333',
          fontFamily: 'Montserrat, sans-serif',
          marginBottom: '10px'
        }}>
          Rezumat (Preview)
        </label>
        <textarea
          value={rezumat}
          onChange={(e) => setRezumat(e.target.value)}
          placeholder="Scrie un rezumat scurt al anunțului..."
          rows={3}
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '14px',
            fontFamily: 'Montserrat, sans-serif',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            outline: 'none',
            resize: 'vertical',
            transition: 'border-color 0.3s ease'
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = '#1a237e'}
          onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
        />
      </div>

      {/* Imagine Principală */}
      <div style={{ marginBottom: '25px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: 700,
          color: '#333',
          fontFamily: 'Montserrat, sans-serif',
          marginBottom: '10px'
        }}>
          Imagine Principală
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{
            padding: '12px',
            fontSize: '14px',
            fontFamily: 'Montserrat, sans-serif',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            width: '100%',
            cursor: 'pointer'
          }}
        />
        {imagine && (
          <div style={{
            marginTop: '15px',
            position: 'relative',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <img
              src={imagine}
              alt="Preview"
              style={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'cover',
                borderRadius: '10px'
              }}
            />
            <button
              onClick={() => setImagine('')}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                padding: '8px 15px',
                fontSize: '12px',
                fontWeight: 600,
                fontFamily: 'Montserrat, sans-serif',
                color: '#fff',
                backgroundColor: 'rgba(244, 67, 54, 0.9)',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Șterge
            </button>
          </div>
        )}
      </div>

      {/* Tags */}
      <div style={{ marginBottom: '25px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: 700,
          color: '#333',
          fontFamily: 'Montserrat, sans-serif',
          marginBottom: '10px'
        }}>
          Etichete (Tags)
        </label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTag()}
            placeholder="Adaugă o etichetă..."
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '14px',
              fontFamily: 'Montserrat, sans-serif',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              outline: 'none'
            }}
          />
          <button
            onClick={addTag}
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif',
              color: '#fff',
              backgroundColor: '#1a237e',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            + Adaugă
          </button>
        </div>
        {tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#1a237e',
                  backgroundColor: '#e8eaf6',
                  borderRadius: '20px'
                }}
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#f44336',
                    cursor: 'pointer',
                    fontSize: '16px',
                    lineHeight: '1',
                    padding: 0
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Rich Text Editor */}
      <div style={{ marginBottom: '25px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: 700,
          color: '#333',
          fontFamily: 'Montserrat, sans-serif',
          marginBottom: '10px'
        }}>
          Conținut Anunț
        </label>

        {/* Toolbar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '15px',
          backgroundColor: '#f5f5f5',
          borderRadius: '10px 10px 0 0',
          borderBottom: '2px solid #e0e0e0'
        }}>
          <button onClick={() => execCommand('bold')} style={toolbarButtonStyle}>
            <strong>B</strong>
          </button>
          <button onClick={() => execCommand('italic')} style={toolbarButtonStyle}>
            <em>I</em>
          </button>
          <button onClick={() => execCommand('underline')} style={toolbarButtonStyle}>
            <u>U</u>
          </button>
          <div style={{ width: '1px', backgroundColor: '#ddd', margin: '0 5px' }} />
          <button onClick={() => execCommand('formatBlock', '<h2>')} style={toolbarButtonStyle}>
            H2
          </button>
          <button onClick={() => execCommand('formatBlock', '<h3>')} style={toolbarButtonStyle}>
            H3
          </button>
          <button onClick={() => execCommand('formatBlock', '<p>')} style={toolbarButtonStyle}>
            P
          </button>
          <div style={{ width: '1px', backgroundColor: '#ddd', margin: '0 5px' }} />
          <button onClick={() => execCommand('insertUnorderedList')} style={toolbarButtonStyle}>
            • Lista
          </button>
          <button onClick={() => execCommand('insertOrderedList')} style={toolbarButtonStyle}>
            1. Lista
          </button>
          <div style={{ width: '1px', backgroundColor: '#ddd', margin: '0 5px' }} />
          <button onClick={() => {
            const url = prompt('Introdu URL-ul:');
            if (url) execCommand('createLink', url);
          }} style={toolbarButtonStyle}>
            Link
          </button>
          <button onClick={() => execCommand('unlink')} style={toolbarButtonStyle}>
            Șterge Link
          </button>
        </div>

        {/* Content Editable */}
        <div
          ref={contentEditableRef}
          contentEditable
          onInput={(e) => setContinut(e.currentTarget.innerHTML)}
          style={{
            minHeight: '400px',
            padding: '25px',
            fontSize: '16px',
            lineHeight: '1.8',
            fontFamily: 'Montserrat, sans-serif',
            border: '2px solid #e0e0e0',
            borderTop: 'none',
            borderRadius: '0 0 10px 10px',
            outline: 'none',
            backgroundColor: '#fff'
          }}
        />
      </div>

      {/* Publicat Toggle */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '20px',
        backgroundColor: publicat ? '#e8f5e9' : '#fff3e0',
        borderRadius: '10px',
        border: `2px solid ${publicat ? '#4caf50' : '#ff9800'}`
      }}>
        <input
          type="checkbox"
          id="publicat"
          checked={publicat}
          onChange={(e) => setPublicat(e.target.checked)}
          style={{
            width: '24px',
            height: '24px',
            cursor: 'pointer'
          }}
        />
        <label
          htmlFor="publicat"
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#333',
            fontFamily: 'Montserrat, sans-serif',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          {publicat ? 'Anunț PUBLICAT - Vizibil pentru toată lumea' : 'Anunț DRAFT - Vizibil doar în dashboard'}
        </label>
      </div>
    </div>
  );
}

const toolbarButtonStyle: React.CSSProperties = {
  padding: '8px 14px',
  fontSize: '13px',
  fontWeight: 600,
  fontFamily: 'Montserrat, sans-serif',
  color: '#333',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s ease'
};
