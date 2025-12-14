'use client';

import { useState } from 'react';

interface AlbumEditorProps {
  onCancel: () => void;
  onSave: () => void;
}

export default function AlbumEditor({ onCancel, onSave }: AlbumEditorProps) {
  const [titlu, setTitlu] = useState('');
  const [descriere, setDescriere] = useState('');
  const [coperta, setCoperta] = useState('');
  const [poze, setPoze] = useState<string[]>([]);
  const [publicat, setPublicat] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleCoperta = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoperta(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdaugaPoze = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const remaining = 70 - poze.length;
      const filesToAdd = fileArray.slice(0, remaining);

      filesToAdd.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPoze(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const stergePoze = (index: number) => {
    setPoze(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!titlu.trim()) {
      alert('Titlul este obligatoriu');
      return;
    }

    if (!coperta) {
      alert('Poza de copertă este obligatorie');
      return;
    }

    if (poze.length === 0) {
      alert('Adaugă cel puțin o poză în album');
      return;
    }

    setUploading(true);

    try {
      const response = await fetch('/api/galerie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titlu,
          descriere,
          coperta,
          poze,
          publicat
        })
      });

      if (response.ok) {
        alert('Album salvat cu succes!');
        onSave();
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert(`Eroare la salvarea albumului: ${errorData.details || errorData.error || 'Unknown error'}`);
      }
    } catch (error: any) {
      console.error('Error saving album:', error);
      alert(`Eroare la salvarea albumului: ${error.message || error.toString()}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '15px',
      padding: '30px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 700,
        color: '#333',
        fontFamily: 'Montserrat, sans-serif',
        marginBottom: '25px',
        marginTop: 0
      }}>
        Album Nou
      </h2>

      <div style={{ marginBottom: '20px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: 600,
          color: '#333',
          marginBottom: '8px',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          Titlu Album*
        </label>
        <input
          type="text"
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          placeholder="Introdu titlul albumului"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontFamily: 'Montserrat, sans-serif',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: 600,
          color: '#333',
          marginBottom: '8px',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          Descriere
        </label>
        <textarea
          value={descriere}
          onChange={(e) => setDescriere(e.target.value)}
          placeholder="Descriere album..."
          rows={4}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontFamily: 'Montserrat, sans-serif',
            resize: 'vertical',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: 600,
          color: '#333',
          marginBottom: '8px',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          Poză Copertă*
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleCoperta}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontFamily: 'Montserrat, sans-serif',
            boxSizing: 'border-box'
          }}
        />
        {coperta && (
          <div style={{ marginTop: '10px' }}>
            <img src={coperta} alt="Copertă" style={{
              width: '200px',
              height: '150px',
              objectFit: 'cover',
              borderRadius: '8px'
            }} />
          </div>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: 600,
          color: '#333',
          marginBottom: '8px',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          Poze Album* ({poze.length}/70)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleAdaugaPoze}
          disabled={poze.length >= 70}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontFamily: 'Montserrat, sans-serif',
            boxSizing: 'border-box'
          }}
        />
        {poze.length >= 70 && (
          <p style={{ color: '#f44336', fontSize: '13px', marginTop: '5px' }}>
            Limită maximă atinsă (70 poze)
          </p>
        )}
        
        {poze.length > 0 && (
          <div style={{
            marginTop: '15px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '10px'
          }}>
            {poze.map((poza, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <img
                  src={poza}
                  alt={`Poza ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
                <button
                  onClick={() => stergePoze(index)}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    backgroundColor: '#f44336',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '25px',
                    height: '25px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '25px' }}>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 600,
          color: '#333',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          <input
            type="checkbox"
            checked={publicat}
            onChange={(e) => setPublicat(e.target.checked)}
            style={{ marginRight: '8px', width: '18px', height: '18px', cursor: 'pointer' }}
          />
          Publică Albumul
        </label>
      </div>

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
        <button
          onClick={onCancel}
          disabled={uploading}
          style={{
            padding: '12px 25px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'Montserrat, sans-serif',
            color: '#666',
            backgroundColor: '#f5f5f5',
            border: 'none',
            borderRadius: '8px',
            cursor: uploading ? 'not-allowed' : 'pointer',
            opacity: uploading ? 0.6 : 1
          }}
        >
          Anulează
        </button>
        <button
          onClick={handleSave}
          disabled={uploading}
          style={{
            padding: '12px 25px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'Montserrat, sans-serif',
            color: '#fff',
            backgroundColor: '#4caf50',
            border: 'none',
            borderRadius: '8px',
            cursor: uploading ? 'not-allowed' : 'pointer',
            opacity: uploading ? 0.6 : 1
          }}
        >
          {uploading ? 'Se salvează...' : 'Salvează Album'}
        </button>
      </div>
    </div>
  );
}
