// App.tsx
import React, { useState } from 'react';
import './App.css';

// Definindo tipos TypeScript
interface MenuItem {
  id: string;
  label: string;
  path: string;
  children?: MenuItem[];
}

interface CourseCategory {
  id: string;
  name: string;
  subcategories: CourseSubcategory[];
}

interface CourseSubcategory {
  id: string;
  name: string;
  courses: string[];
}

const App: React.FC = () => {
  // Estado para controlar a página ativa
  const [activePage, setActivePage] = useState('inicio');
  // Estado para controlar qual item do menu de cursos está expandido
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  // Estado para controlar a visibilidade do dropdown de cursos
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false);
  
  // Dados de navegação
  const menuItems: MenuItem[] = [
    { id: 'inicio', label: 'Início', path: '/' },
    { 
      id: 'cursos', 
      label: 'Cursos', 
      path: '/cursos',
      children: [
        { id: 'programacao', label: 'Programação', path: '/cursos/programacao' },
        { id: 'design', label: 'Design', path: '/cursos/design' },
        { id: 'jogos', label: 'Desenvolvimento de Jogos', path: '/cursos/jogos' },
        { id: 'banco-dados', label: 'Banco de dados', path: '/cursos/banco-dados' }
      ]
    },
    { id: 'blog', label: 'Blog', path: '/blog' },
    { id: 'contato', label: 'Contato', path: '/contato' },
    { id: 'minha-conta', label: 'Minha Conta', path: '/minha-conta' }
  ];

  // Dados dos cursos organizados por categoria
  const coursesData: CourseCategory[] = [
    {
      id: 'programacao',
      name: 'Programação',
      subcategories: [
        {
          id: 'frontend',
          name: 'Front-end',
          courses: ['React']
        },
        {
          id: 'backend',
          name: 'Back-end',
          courses: ['Node', 'Python + Django']
        }
      ]
    },
    {
      id: 'design',
      name: 'Design',
      subcategories: [
        {
          id: 'ux',
          name: 'UX',
          courses: ['Prototipagem']
        }
      ]
    },
    {
      id: 'jogos',
      name: 'Desenvolvimento de Jogos',
      subcategories: [
        {
          id: 'engine',
          name: 'Engines',
          courses: ['Unity', 'Unreal']
        }
      ]
    },
    {
      id: 'banco-dados',
      name: 'Banco de Dados',
      subcategories: [
        {
          id: 'bancos',
          name: 'Sistemas',
          courses: ['MySQL', 'MongoDB']
        }
      ]
    }
  ];

  // Função para toggle do dropdown de cursos
  const toggleCoursesDropdown = () => {
    setShowCoursesDropdown(!showCoursesDropdown);
  };

  // Função para lidar com a navegação
  const handleNavigation = (itemId: string) => {
    if (itemId === 'cursos') {
      // Se já está na página de cursos, alterna o dropdown
      if (activePage === 'cursos') {
        toggleCoursesDropdown();
      } else {
        // Se não está na página de cursos, vai para a página e abre o dropdown
        setActivePage(itemId);
        setShowCoursesDropdown(true);
      }
    } else {
      setActivePage(itemId);
      setShowCoursesDropdown(false);
    }
    
    if (itemId !== 'cursos') {
      setExpandedCategory(null);
    }
  };

  // Função para expandir/recolher categorias de cursos
  const toggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
    // Fecha o dropdown após selecionar uma categoria
    setShowCoursesDropdown(false);
  };

  // Renderizar conteúdo com base na página ativa
  const renderContent = () => {
    switch (activePage) {
      case 'inicio':
        return (
          <div className="content">
            <h1>Bem-vindo à TechLearn</h1>
            <p>Escolha entre diversos cursos de tecnologia e avance na sua carreira.</p>
            <div className="featured-courses">
              <h2>Cursos em Destaque</h2>
              <div className="course-cards">
                <div className="course-card">React</div>
                <div className="course-card">Node.js</div>
                <div className="course-card">UX Design</div>
              </div>
            </div>
          </div>
        );
      case 'cursos':
        return (
          <div className="content">
            <h1>Nossos Cursos</h1>
            <p>Explore nossas categorias de cursos e encontre o ideal para você.</p>
            <div className="courses-container">
              {coursesData.map(category => (
                <div key={category.id} className="course-category">
                  <h2 
                    onClick={() => toggleCategory(category.id)}
                    className="category-header"
                  >
                    {category.name}
                    <span className={`toggle-icon ${expandedCategory === category.id ? 'expanded' : ''}`}>
                      ▼
                    </span>
                  </h2>
                  {expandedCategory === category.id && (
                    <div className="subcategories">
                      {category.subcategories.map(subcategory => (
                        <div key={subcategory.id} className="subcategory">
                          <h3>{subcategory.name}</h3>
                          <div className="courses-list">
                            {subcategory.courses.map(course => (
                              <div key={course} className="course-item">
                                {course}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'blog':
        return (
          <div className="content">
            <h1>Blog</h1>
            <p>Artigos e dicas sobre tecnologia e aprendizado.</p>
          </div>
        );
      case 'contato':
        return (
          <div className="content">
            <h1>Contato</h1>
            <p>Entre em contato conosco para mais informações.</p>
          </div>
        );
      case 'minha-conta':
        return (
          <div className="content">
            <h1>Minha Conta</h1>
            <p>Acesse sua área pessoal para gerenciar seus cursos.</p>
          </div>
        );
      default:
        return (
          <div className="content">
            <h1>Página não encontrada</h1>
          </div>
        );
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">Tech<span>Learn</span></div>
          <nav className="navigation">
            <ul>
              {menuItems.map(item => (
                <li key={item.id}>
                  <a
                    href={item.path}
                    className={activePage === item.id ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                  {/* Submenu para Cursos */}
                  {item.id === 'cursos' && item.children && (
                    <ul className={`submenu ${showCoursesDropdown ? 'show' : ''}`}>
                      {item.children.map(child => (
                        <li key={child.id}>
                          <a
                            href={child.path}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleCategory(child.id);
                            }}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="main">
        {renderContent()}
      </main>

      <footer className="footer">
        <p>&copy; 2025 TechLearn - Todos os direitos reservados</p>
      </footer>
    </div>
  );
};

export default App;