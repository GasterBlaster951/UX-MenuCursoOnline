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

// Adicionando a interface Product
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
}

const App: React.FC = () => {
  // Estado para controlar a página ativa
  const [activePage, setActivePage] = useState('inicio');
  // Estado para controlar qual item do menu de cursos está expandido
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  // Estado para controlar a visibilidade do dropdown de cursos
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false);
  // Adicionando estado para produto selecionado
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  
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

  // Adicionando dados de produtos
  const productsData: Product[] = [
    {
      id: 'react-course',
      name: 'Curso Completo de React',
      price: 297.90,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      category: 'programacao',
      popular: true
    },
    {
      id: 'node-course',
      name: 'Node.js do Zero ao Avançado',
      price: 347.50,
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      category: 'programacao',
      popular: true
    },
    {
      id: 'python-django',
      name: 'Python + Django Fullstack',
      price: 397.00,
      image: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/310430079/original/dc2eaa1c0b0a60e4940e5d14bcb7b97128d9a340/develop-django-python-and-react-js-full-stack-websites.png',
      category: 'programacao'
    },
    {
      id: 'ux-course',
      name: 'UX Design & Prototipagem',
      price: 247.90,
      image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      category: 'design'
    },
    {
      id: 'unity-course',
      name: 'Desenvolver Jogos Unity / Unreal',
      price: 427.80,
      image: 'https://miro.medium.com/v2/resize:fit:2800/0*S3yGkhH4XGvv5kgo.png',
      category: 'jogos'
    },
    {
      id: 'mysql-course',
      name: 'MySQL para Desenvolvedores',
      price: 197.50,
      image: 'https://scriptdev.com.br/wp-content/uploads/2023/05/como-instalar-mysql-workbench.png',
      category: 'banco-dados'
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

  // Adicionando função para manipular clique no produto
  const handleProductClick = (productId: string) => {
    setSelectedProduct(productId);
    // Simular um feedback visual (poderia abrir um modal, etc.)
    setTimeout(() => {
      setSelectedProduct(null);
    }, 300);
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
              <div className="products-grid">
                {productsData.map(product => (
                  <div 
                    key={product.id} 
                    className={`product-card ${selectedProduct === product.id ? 'clicked' : ''} ${product.popular ? 'popular' : ''}`}
                    onClick={() => handleProductClick(product.id)}
                  >
                    {product.popular && <div className="popular-badge">Popular</div>}
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-price">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                      </p>
                      <button className="product-button">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                ))}
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