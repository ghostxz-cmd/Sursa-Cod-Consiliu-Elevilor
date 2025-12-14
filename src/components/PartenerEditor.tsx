'use client';

import { useState } from 'react';

interface PartenerEditorProps {
  onSave: () => void;
  onCancel: () => void;
}

export default function PartenerEditor({ onSave, onCancel }: PartenerEditorProps) {
  const [nume, setNume] = useState('');
  const [logo, setLogo] = useState('');
  const [descriereScurta, setDescriereScurta] = useState('');
  const [descriereCompleta, setDescriereCompleta] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [adresa, setAdresa] = useState('');
  const [imagineCover, setImagineCover] = useState('');
  const [pozitieAfisare, setPozitieAfisare] = useState(0);
  const [publicat, setPublicat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagineCover(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nume.trim()) {
      setError('Te rog să completezi numele partenerului');
      return;
    }

    if (!logo) {
      setError('Te rog să încarci logo-ul partenerului');
      return;
    }

    if (!descriereCompleta.trim()) {
      setError('Te rog să completezi descrierea completă');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/parteneri', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nume,
          logo,
          descriere_scurta: descriereScurta,
          descriere_completa: descriereCompleta,
          website,
          email,
          telefon,
          adresa,
          imagine_cover: imagineCover,
          pozitie_afisare: pozitieAfisare,
          publicat,
        }),
      });

      if (!res.ok) {
        throw new Error('Eroare la salvarea partenerului');
      }

      onSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'A apărut o eroare');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
      overflowY: 'auto'
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
      }}>
        <div style={{
          padding: '30px',
          borderBottom: '1px solid #e0e0e0',
          position: 'sticky',
          top: 0,
          backgroundColor: '#fff',
          zIndex: 1
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: 700,
            color: '#1a1a1a',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            Adaugă Partener Nou
          </h2>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '30px' }}>
          {error && (
            <div style={{
              backgroundColor: '#ffebee',
              color: '#c62828',
              padding: '12px 20px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          {/* Nume Partener */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 600,
              color: '#333',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '14px'
            }}>
              Nume Partener *
            </label>
            <input
              type="text"
              value={nume}
              onChange={(e) => setNume(e.target.value)}
              placeholder="ex: SC Partener SRL"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '15px',
                fontFamily: 'Montserrat, sans-serif',
                transition: 'border-color 0.2s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1e88e5'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          {/* Logo Upload */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 600,
              color: '#333',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '14px'
            }}>
              Logo Partener *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px dashed #e0e0e0',
                borderRadius: '8px',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            />
            {logo && (
              <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <img
                  src={logo}
                  alt="Logo preview"
                  style={{
                    maxWidth: '200px',
                    maxHeight: '200px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
              </div>
            )}
          </div>

          {/* Descriere Scurtă */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 600,
              color: '#333',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '14px'
            }}>
              Descriere Scurtă (Optional)
            </label>
            <textarea
              value={descriereScurta}
              onChange={(e) => setDescriereScurta(e.target.value)}
              placeholder="O scurtă descriere care va apărea în lista de parteneri..."
              rows={3}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '15px',
                fontFamily: 'Montserrat, sans-serif',
                resize: 'vertical',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1e88e5'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          {/* Descriere Completă */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 600,
              color: '#333',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '14px'
            }}>
              Descriere Completă *
            </label>
            <textarea
              value={descriereCompleta}
              onChange={(e) => setDescriereCompleta(e.target.value)}
              placeholder="Descrierea completă cu toate detaliile despre parteneriat..."
              rows={8}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '15px',
                fontFamily: 'Montserrat, sans-serif',
                resize: 'vertical',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1e88e5'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          {/* Cover Image Upload */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 600,
              color: '#333',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '14px'
            }}>
              Imagine Cover (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px dashed #e0e0e0',
                borderRadius: '8px',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            />
            {imagineCover && (
              <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <img
                  src={imagineCover}
                  alt="Cover preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
              </div>
            )}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '25px'
          }}>
            {/* Website */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 600,
                color: '#333',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '14px'
              }}>
                Website (Optional)
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://example.com"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontFamily: 'Montserrat, sans-serif',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1e88e5'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 600,
                color: '#333',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '14px'
              }}>
                Email (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@partener.ro"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontFamily: 'Montserrat, sans-serif',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1e88e5'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '25px'
          }}>
            {/* Telefon */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 600,
                color: '#333',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '14px'
              }}>
                Telefon (Optional)
              </label>
              <input
                type="tel"
                value={telefon}
                onChange={(e) => setTelefon(e.target.value)}
                placeholder="+40 123 456 789"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontFamily: 'Montserrat, sans-serif',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1e88e5'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            {/* Poziție Afișare */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 600,
                color: '#333',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '14px'
              }}>
                Poziție Afișare
              </label>
              <input
                type="number"
                value={pozitieAfisare}
                onChange={(e) => setPozitieAfisare(parseInt(e.target.value) || 0)}
                placeholder="0"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontFamily: 'Montserrat, sans-serif',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1e88e5'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
          </div>

          {/* Adresă */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 600,
              color: '#333',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '14px'
            }}>
              Adresă (Optional)
            </label>
            <textarea
              value={adresa}
              onChange={(e) => setAdresa(e.target.value)}
              placeholder="Strada, Nr., Oraș, Județ"
              rows={2}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '15px',
                fontFamily: 'Montserrat, sans-serif',
                resize: 'vertical',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1e88e5'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          {/* Publicat Checkbox */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '15px',
              color: '#333'
            }}>
              <input
                type="checkbox"
                checked={publicat}
                onChange={(e) => setPublicat(e.target.checked)}
                style={{
                  width: '20px',
                  height: '20px',
                  marginRight: '10px',
                  cursor: 'pointer'
                }}
              />
              <span style={{ fontWeight: 600 }}>Publică imediat</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'flex-end',
            paddingTop: '20px',
            borderTop: '1px solid #e0e0e0'
          }}>
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              style={{
                padding: '12px 30px',
                backgroundColor: '#f5f5f5',
                color: '#666',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: 'Montserrat, sans-serif',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: loading ? 0.5 : 1
              }}
            >
              Anulează
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '12px 30px',
                backgroundColor: loading ? '#ccc' : '#1e88e5',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: 'Montserrat, sans-serif',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {loading ? 'Se salvează...' : 'Salvează Partener'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
