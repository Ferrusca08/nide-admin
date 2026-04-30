import React from 'react';

const NideLanding = () => {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#e6f4f1', /* Pastel Turquoise/Blue tint background */
            fontFamily: '"Lato", sans-serif',
            color: '#002147', /* Oxford Blue */
            paddingBottom: '4rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            
            {/* Background Decorators */}
            <div style={{ position: 'absolute', top: -50, left: -50, width: 300, height: 300, backgroundColor: '#D8B4E2', borderRadius: '50%', opacity: 0.3, filter: 'blur(50px)' }}></div>
            <div style={{ position: 'absolute', top: '40%', right: -100, width: 400, height: 400, backgroundColor: '#FFB6C1', borderRadius: '50%', opacity: 0.3, filter: 'blur(70px)' }}></div>
            <div style={{ position: 'absolute', bottom: -50, left: '20%', width: 250, height: 250, backgroundColor: '#40E0D0', borderRadius: '50%', opacity: 0.2, filter: 'blur(60px)' }}></div>

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 2rem', position: 'relative', zIndex: 10 }}>
                
                {/* Hero Section */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontFamily: '"Baloo 2", cursive', fontSize: '4rem', margin: 0, color: '#002147', letterSpacing: '-1px', lineHeight: 1.1 }}>
                        NIDE
                    </h1>
                    <h2 style={{ fontFamily: '"Handlee", cursive', fontSize: '1.8rem', color: '#14B8A6', margin: '0.5rem 0 1.5rem 0', fontWeight: 400 }}>
                        Sembremos juntos el futuro
                    </h2>
                    <p style={{
                        fontFamily: '"Lato", sans-serif',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: '#666',
                        background: 'white',
                        display: 'inline-block',
                        padding: '0.4rem 1rem',
                        borderRadius: '20px',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                        border: '1px dashed #C8A2C8'
                    }}>
                        La fundación opera desde 1952
                    </p>
                </div>

                {/* Central Tree Section */}
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    position: 'relative',
                    marginBottom: '5rem'
                }}>
                    
                    {/* Dashed line to connect */}
                    <div style={{ position: 'absolute', width: '2px', height: '120%', borderLeft: '2px dashed #D8B4E2', left: '50%', top: '-20%', zIndex: -1 }}></div>

                    <div style={{
                        backgroundColor: 'white',
                        padding: '1.5rem',
                        borderRadius: '30px',
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                        border: '3px solid #002147',
                        position: 'relative'
                    }}>
                        <img 
                            src="/arbol_suenos.jpg" 
                            alt="Árbol de los Sueños" 
                            style={{ 
                                width: '100%', 
                                maxWidth: '350px', 
                                height: 'auto', 
                                borderRadius: '15px' 
                            }} 
                        />
                        {/* Little star badge */}
                        <div style={{ position: 'absolute', top: -20, right: -20, background: '#FFB6C1', width: 60, height: 60, borderRadius: '50%', border: '2px dashed #002147', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', transform: 'rotate(15deg)' }}>
                            ✨
                        </div>
                    </div>
                </div>

                {/* Content Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    
                    {/* Sobre Nosotros */}
                    <div style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: '20px',
                        border: '2px dashed #14B8A6',
                        position: 'relative',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                    }}>
                        <h3 style={{ fontFamily: '"Baloo 2", cursive', fontSize: '1.8rem', color: '#002147', marginTop: 0 }}>
                            Sobre Nosotros
                        </h3>
                        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: '#444' }}>
                            Antes conocidos como Instituto de Protección para el Niño Desvalido Miguel Alemán, nuestra identidad se renueva para impulsar las capacidades, condiciones y derechos de los niños y jóvenes en México. Soñamos con un país lleno de protección y amor.
                        </p>
                    </div>

                    {/* Concepto */}
                    <div style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: '20px',
                        border: '2px dashed #FFB6C1',
                        position: 'relative',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                    }}>
                        <h3 style={{ fontFamily: '"Baloo 2", cursive', fontSize: '1.8rem', color: '#002147', marginTop: 0 }}>
                            Nuestro Símbolo
                        </h3>
                        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: '#444' }}>
                            El árbol de nubes representa un universo de oportunidades cambiantes, como el cielo mismo. Cada estrella que cae no es un simple deseo, es una semilla dispuesta a germinar e inspirar los sueños más altos del mañana.
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <p style={{ fontFamily: '"Handlee", cursive', fontSize: '1.4rem', color: '#002147', marginBottom: '1.5rem' }}>
                        Tú también puedes ser parte de este hermoso cielo.
                    </p>
                    <button style={{
                        backgroundColor: '#FFB6C1',
                        color: '#002147',
                        fontFamily: '"Baloo 2", cursive',
                        fontSize: '1.4rem',
                        padding: '1rem 3.5rem',
                        border: '3px solid #002147',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        boxShadow: '4px 6px 0px #002147',
                        transition: 'transform 0.1s, box-shadow 0.1s'
                    }}
                    onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = '0px 2px 0px #002147'; }}
                    onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '4px 6px 0px #002147'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '4px 6px 0px #002147'; }}
                    >
                        Quiero Colaborar
                    </button>
                </div>

            </div>
        </div>
    );
};

export default NideLanding;
