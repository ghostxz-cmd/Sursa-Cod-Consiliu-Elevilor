'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface BlogEditorProps {
  onCancel: () => void;
  onSave: () => void;
}

export default function BlogEditor({ onCancel, onSave }: BlogEditorProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    titlu: '',
    rezumat: '',
    continut: '',
    imagine_principala: '',
    tags: '',
    publicat: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    contentRef.current?.focus();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, imagine_principala: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const continutHTML = contentRef.current?.innerHTML || '';
      
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          continut: continutHTML,
          tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : []
        })
      });

      const data = await response.json();

      if (response.ok) {
        onSave();
      } else {
        setError(data.error || 'Eroare la salvarea articolului');
      }
    } catch (err) {
      setError('A apărut o eroare. Te rugăm să încerci din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '15px',
      padding: '30px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#333',
          fontFamily: 'Montserrat, sans-serif',
          margin: 0
        }}>
          Creare Articol Nou
        </h2>
        <button
          onClick={onCancel}
          style={{
            padding: '8px 20px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'Montserrat, sans-serif',
            color: '#666',
            backgroundColor: 'transparent',
            border: '1px solid #ddd',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          ← Înapoi
        </button>
      </div>

      {error && (
        <div style={{
          padding: '15px',
          backgroundColor: '#ffebee',
          color: '#c62828',
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Titlu */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 600,
            color: '#333',
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: '8px'
          }}>
            Titlu *
          </label>
          <input
            type="text"
            required
            value={formData.titlu}
            onChange={(e) => setFormData(prev => ({ ...prev, titlu: e.target.value }))}
            style={{
              width: '100%',
              padding: '12px 15px',
              fontSize: '15px',
              fontFamily: 'Montserrat, sans-serif',
              border: '1px solid #ddd',
              borderRadius: '8px',
              outline: 'none'
            }}
            placeholder="Introdu titlul articolului"
          />
        </div>

        {/* Rezumat */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 600,
            color: '#333',
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: '8px'
          }}>
            Rezumat (preview)
          </label>
          <textarea
            value={formData.rezumat}
            onChange={(e) => setFormData(prev => ({ ...prev, rezumat: e.target.value }))}
            rows={3}
            style={{
              width: '100%',
              padding: '12px 15px',
              fontSize: '14px',
              fontFamily: 'Montserrat, sans-serif',
              border: '1px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              resize: 'vertical'
            }}
            placeholder="Scrie un rezumat scurt care va apărea în listă"
          />
        </div>

        {/* Imagine Banner */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 600,
            color: '#333',
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: '8px'
          }}>
            Imagine Banner
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{
              width: '100%',
              padding: '12px 15px',
              fontSize: '14px',
              fontFamily: 'Montserrat, sans-serif',
              border: '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          />
          {imagePreview && (
            <div style={{ marginTop: '15px', position: 'relative', width: '100%', height: '200px' }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            </div>
          )}
        </div>

        {/* Editor Toolbar */}
        <div style={{ marginBottom: '10px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 600,
            color: '#333',
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: '8px'
          }}>
            Conținut Articol *
          </label>
          <div style={{
            display: 'flex',
            gap: '5px',
            padding: '10px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px 8px 0 0',
            border: '1px solid #ddd',
            borderBottom: 'none',
            flexWrap: 'wrap'
          }}>
            <button
              type="button"
              onClick={() => applyFormat('bold')}
              style={{
                padding: '8px 12px',
                fontSize: '14px',
                fontWeight: 700,
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              title="Bold"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => applyFormat('italic')}
              style={{
                padding: '8px 12px',
                fontSize: '14px',
                fontStyle: 'italic',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              title="Italic"
            >
              I
            </button>
            <button
              type="button"
              onClick={() => applyFormat('underline')}
              style={{
                padding: '8px 12px',
                fontSize: '14px',
                textDecoration: 'underline',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              title="Underline"
            >
              U
            </button>
            <button
              type="button"
              onClick={() => applyFormat('formatBlock', '<h2>')}
              style={{
                padding: '8px 12px',
                fontSize: '14px',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif'
              }}
              title="Heading 2"
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => applyFormat('formatBlock', '<h3>')}
              style={{
                padding: '8px 12px',
                fontSize: '14px',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif'
              }}
              title="Heading 3"
            >
              H3
            </button>
            <button
              type="button"
              onClick={() => applyFormat('insertUnorderedList')}
              style={{
                padding: '8px 12px',
                fontSize: '14px',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              title="Bullet List"
            >
              • List
            </button>
            <button
              type="button"
              onClick={() => applyFormat('insertOrderedList')}
              style={{
                padding: '8px 12px',
                fontSize: '14px',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              title="Numbered List"
            >
              1. List
            </button>
            <button
              type="button"
              onClick={() => {
                const url = prompt('Introdu URL-ul link-ului:');
                if (url) applyFormat('createLink', url);
              }}
              style={{
                padding: '8px 12px',
                fontSize: '14px',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              title="Insert Link"
            >
              🔗 Link
            </button>
          </div>
        </div>

        {/* Content Editor */}
        <div
          ref={contentRef}
          contentEditable
          suppressContentEditableWarning
          style={{
            minHeight: '400px',
            padding: '20px',
            fontSize: '15px',
            lineHeight: '1.8',
            fontFamily: 'Montserrat, sans-serif',
            border: '1px solid #ddd',
            borderRadius: '0 0 8px 8px',
            outline: 'none',
            backgroundColor: '#fff'
          }}
          data-placeholder="Scrie conținutul articolului aici..."
        />

        {/* Tags */}
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 600,
            color: '#333',
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: '8px'
          }}>
            Tag-uri (separate prin virgulă)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            style={{
              width: '100%',
              padding: '12px 15px',
              fontSize: '14px',
              fontFamily: 'Montserrat, sans-serif',
              border: '1px solid #ddd',
              borderRadius: '8px',
              outline: 'none'
            }}
            placeholder="ex: evenimente, noutăți, anunțuri"
          />
        </div>

        {/* Publicat Toggle */}
        <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            id="publicat"
            checked={formData.publicat}
            onChange={(e) => setFormData(prev => ({ ...prev, publicat: e.target.checked }))}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <label
            htmlFor="publicat"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#333',
              fontFamily: 'Montserrat, sans-serif',
              cursor: 'pointer'
            }}
          >
            Publică articolul imediat
          </label>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            style={{
              padding: '12px 30px',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif',
              color: '#666',
              backgroundColor: '#f5f5f5',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            Anulează
          </button>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 30px',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif',
              color: '#fff',
              backgroundColor: '#4caf50',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Se salvează...' : 'Salvează Articol'}
          </button>
        </div>
      </form>
    </div>
  );
}
