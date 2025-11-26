import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  isCreating?: boolean;
  projectPreview?: {
    title: string;
    description: string;
    features: string[];
  };
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      text: 'Привет! Я — AI-ассистент для создания сайтов. Просто опиши свою идею, и я создам для тебя сайт за пару минут. Что будем создавать?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const capabilities = [
    {
      icon: 'Layout',
      title: 'Создание UI/UX',
      description: 'Разрабатываю компоненты, страницы и полноценные интерфейсы',
      examples: ['Создай лендинг для продукта', 'Сделай форму регистрации', 'Добавь навигационное меню']
    },
    {
      icon: 'Database',
      title: 'Работа с базой данных',
      description: 'Создаю таблицы, пишу SQL-запросы, настраиваю миграции',
      examples: ['Создай таблицу пользователей', 'Добавь поле email в таблицу', 'Выведи последние 10 записей']
    },
    {
      icon: 'Server',
      title: 'Backend функции',
      description: 'Пишу API на Python/TypeScript, интегрирую внешние сервисы',
      examples: ['Создай API для авторизации', 'Подключи OpenAI', 'Сделай отправку email']
    },
    {
      icon: 'GitBranch',
      title: 'Интеграция с GitHub',
      description: 'Синхронизирую код с репозиторием, управляю версиями',
      examples: ['Подключи GitHub', 'Создай новую ветку', 'Залей изменения']
    },
    {
      icon: 'Globe',
      title: 'Публикация в сеть',
      description: 'Публикую сайт, настраиваю домены, выпускаю SSL-сертификаты',
      examples: ['Опубликуй сайт', 'Подключи домен example.com', 'Настрой HTTPS']
    },
    {
      icon: 'Bug',
      title: 'Исправление ошибок',
      description: 'Анализирую логи, нахожу и исправляю баги автоматически',
      examples: ['Исправь ошибку на странице', 'Проверь логи', 'Почему не работает кнопка?']
    },
    {
      icon: 'Package',
      title: 'Управление зависимостями',
      description: 'Устанавливаю и обновляю npm-пакеты, библиотеки',
      examples: ['Установи библиотеку axios', 'Обнови React до последней версии', 'Удали неиспользуемые пакеты']
    },
    {
      icon: 'Image',
      title: 'Генерация изображений',
      description: 'Создаю изображения через FLUX AI по текстовому описанию',
      examples: ['Создай иконку для сайта', 'Сгенерируй баннер для героя', 'Нужна иллюстрация космоса']
    },
    {
      icon: 'Palette',
      title: 'Дизайн и стили',
      description: 'Меняю цвета, шрифты, адаптирую под мобильные',
      examples: ['Смени цветовую схему на синюю', 'Добавь шрифт Montserrat', 'Сделай адаптивную вёрстку']
    },
    {
      icon: 'Zap',
      title: 'Анимации',
      description: 'Добавляю плавные переходы, hover-эффекты, микроанимации',
      examples: ['Добавь fade-in анимацию', 'Сделай плавное появление карточек', 'Анимируй кнопки при наведении']
    },
    {
      icon: 'Lock',
      title: 'Управление секретами',
      description: 'Создаю и храню API-ключи, токены безопасно',
      examples: ['Создай секрет для API-ключа', 'Добавь токен для OAuth', 'Храни пароль базы данных']
    },
    {
      icon: 'FileText',
      title: 'Работа с файлами',
      description: 'Читаю, редактирую, создаю файлы проекта',
      examples: ['Создай новый компонент Header', 'Отредактируй файл App.tsx', 'Удали старый файл']
    }
  ];

  const faqItems = [
    {
      question: 'Какие технологии ты используешь?',
      answer: 'Я работаю с React, TypeScript, Vite, Tailwind CSS для фронтенда. Для бэкенда использую Python и TypeScript (Node.js), PostgreSQL для базы данных. Всё разворачивается в облаке с автоматическим CI/CD.'
    },
    {
      question: 'Можешь ли ты работать с базой данных?',
      answer: 'Да! Я создаю таблицы, пишу миграции, выполняю SQL-запросы, настраиваю связи между таблицами. У каждого проекта есть своя PostgreSQL база данных.'
    },
    {
      question: 'Как ты создаёшь backend функции?',
      answer: 'Я пишу serverless функции на Python (для работы с данными, AI/ML) или TypeScript (для auth, real-time). Они автоматически деплоятся в облако и получают свои URL для вызова.'
    },
    {
      question: 'Можно ли получить код проекта?',
      answer: 'Конечно! Подключи GitHub, и весь код автоматически синхронизируется с репозиторием. Также можно скачать код или готовый билд проекта.'
    },
    {
      question: 'Как быстро ты работаешь?',
      answer: 'Простой компонент — 10-20 секунд. Страница с несколькими разделами — 1-2 минуты. Backend функция с базой данных — 2-3 минуты. Я очень быстрый!'
    },
    {
      question: 'Можешь ли ты исправлять ошибки?',
      answer: 'Да! Я анализирую логи (frontend и backend), нахожу причину ошибки и автоматически исправляю код. Просто скажи "не работает X" или "ошибка в Y".'
    },
    {
      question: 'Как ты работаешь с изображениями?',
      answer: 'Я генерирую изображения через FLUX AI по текстовому описанию и автоматически загружаю их в проект. Просто опиши, какое изображение нужно.'
    },
    {
      question: 'Можно ли интегрировать внешние API?',
      answer: 'Да! Я подключаю OpenAI, Stripe, SendGrid и другие сервисы. Создаю секреты для API-ключей, пишу backend функции для интеграции.'
    }
  ];

  const techStack = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui'] },
    { category: 'Backend', items: ['Python 3.11', 'Node.js 22', 'Cloud Functions', 'Serverless'] },
    { category: 'Database', items: ['PostgreSQL', 'SQL Migrations', 'Simple Query Protocol'] },
    { category: 'Tools', items: ['GitHub', 'Bun', 'ESLint', 'Git'] },
    { category: 'AI/ML', items: ['FLUX Image Gen', 'OpenAI Integration', 'LangChain Ready'] },
    { category: 'Deploy', items: ['Cloud Hosting', 'SSL Certificates', 'Custom Domains'] }
  ];

  const simulateProjectCreation = (userMessage: string) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('интернет-магазин') || msg.includes('магазин') || (msg.includes('сайт') && msg.includes('товар'))) {
      return {
        title: 'Интернет-магазин',
        description: 'Создаю полноценный интернет-магазин с каталогом, корзиной и оформлением заказа',
        features: [
          '✓ Главная страница с популярными товарами',
          '✓ Каталог с фильтрами и поиском',
          '✓ Карточки товаров с описанием',
          '✓ Корзина с расчётом стоимости',
          '✓ Форма оформления заказа',
          '✓ Адаптивный дизайн для мобильных'
        ]
      };
    } else if (msg.includes('лендинг') || msg.includes('посадочн')) {
      return {
        title: 'Продающий лендинг',
        description: 'Создаю лендинг с акцентом на конверсию и продажи',
        features: [
          '✓ Hero-секция с ярким заголовком',
          '✓ Блок с преимуществами продукта',
          '✓ Отзывы клиентов',
          '✓ Призыв к действию (CTA)',
          '✓ Форма захвата лидов',
          '✓ Адаптивная вёрстка'
        ]
      };
    } else if (msg.includes('портфолио') || msg.includes('резюме')) {
      return {
        title: 'Портфолио',
        description: 'Создаю стильное портфолио для демонстрации работ',
        features: [
          '✓ Главная с информацией о тебе',
          '✓ Галерея проектов с фильтрами',
          '✓ Раздел навыков и опыта',
          '✓ Контактная форма',
          '✓ Ссылки на соцсети',
          '✓ Современный минималистичный дизайн'
        ]
      };
    } else if (msg.includes('блог') || msg.includes('статьи')) {
      return {
        title: 'Блог',
        description: 'Создаю блог с системой статей и категорий',
        features: [
          '✓ Главная со списком статей',
          '✓ Страницы отдельных статей',
          '✓ Категории и теги',
          '✓ Поиск по статьям',
          '✓ Авторы статей',
          '✓ Адаптивная типографика'
        ]
      };
    } else if (msg.includes('корпоративн') || msg.includes('компани')) {
      return {
        title: 'Корпоративный сайт',
        description: 'Создаю представительский сайт компании',
        features: [
          '✓ Главная с информацией о компании',
          '✓ Услуги/Продукты',
          '✓ О нас и команда',
          '✓ Кейсы и отзывы',
          '✓ Контакты с картой',
          '✓ Профессиональный дизайн'
        ]
      };
    } else if (msg.includes('сайт') || msg.includes('создай') || msg.includes('сделай')) {
      return {
        title: 'Веб-сайт',
        description: 'Создаю современный адаптивный веб-сайт',
        features: [
          '✓ Главная страница',
          '✓ Навигационное меню',
          '✓ Несколько разделов',
          '✓ Контактная форма',
          '✓ Footer с информацией',
          '✓ Адаптивный дизайн'
        ]
      };
    }
    
    return null;
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    const projectPreview = simulateProjectCreation(userMessage);
    
    setTimeout(() => {
      const msg = userMessage.toLowerCase();
      let response = '';
      
      if (projectPreview) {
        response = `Отлично! Начинаю создавать ${projectPreview.title.toLowerCase()}. Сейчас настрою структуру проекта...`;
        
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          text: response,
          isCreating: true,
          projectPreview 
        }]);
        setIsTyping(false);

        setTimeout(() => {
          setMessages(prev => 
            prev.map((msg, idx) => 
              idx === prev.length - 1 ? { ...msg, isCreating: false } : msg
            )
          );
          
          setTimeout(() => {
            setMessages(prev => [...prev, {
              role: 'assistant',
              text: `✨ Готово! Я создал ${projectPreview.title.toLowerCase()} со всеми нужными компонентами. Проект готов к использованию!\n\nЧто хочешь улучшить или добавить?`
            }]);
          }, 500);
        }, 4000);
        
      } else if (msg.includes('база') || msg.includes('таблиц') || msg.includes('sql')) {
        response = 'Создам структуру базы данных! Какие таблицы нужны? Например: "таблица users с полями email, password, created_at"';
        setMessages(prev => [...prev, { role: 'assistant', text: response }]);
        setIsTyping(false);
      } else if (msg.includes('backend') || msg.includes('api') || msg.includes('функц')) {
        response = 'Напишу backend функцию! На каком языке (Python для данных/AI или TypeScript для auth/real-time)? Что она должна делать?';
        setMessages(prev => [...prev, { role: 'assistant', text: response }]);
        setIsTyping(false);
      } else if (msg.includes('ошибк') || msg.includes('не работает') || msg.includes('баг')) {
        response = 'Сейчас проверю логи и найду проблему. Опиши, что именно не работает или в каком компоненте ошибка?';
        setMessages(prev => [...prev, { role: 'assistant', text: response }]);
        setIsTyping(false);
      } else if (msg.includes('дизайн') || msg.includes('цвет') || msg.includes('стил')) {
        response = 'Займусь дизайном! Какие цвета предпочитаешь? Нужны анимации? Какое настроение должен передавать дизайн?';
        setMessages(prev => [...prev, { role: 'assistant', text: response }]);
        setIsTyping(false);
      } else if (msg.includes('github') || msg.includes('гит') || msg.includes('репозитори')) {
        response = 'Подключу GitHub! В настройках проекта выбери "Подключить GitHub", авторизуйся, и код автоматически синхронизируется.';
        setMessages(prev => [...prev, { role: 'assistant', text: response }]);
        setIsTyping(false);
      } else if (msg.includes('опубликовать') || msg.includes('домен') || msg.includes('хостинг')) {
        response = 'Опубликую сайт в интернет! Нужен свой домен или подойдёт автоматический поддомен?';
        setMessages(prev => [...prev, { role: 'assistant', text: response }]);
        setIsTyping(false);
      } else {
        response = 'Интересная задача! Расскажи подробнее, что именно нужно сделать? Могу создать UI, настроить backend, работать с базой данных или исправить ошибки.';
        setMessages(prev => [...prev, { role: 'assistant', text: response }]);
        setIsTyping(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Sparkles" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold">
              AI Ассистент
            </span>
          </div>
          <div className="hidden md:flex gap-6">
            <a href="#capabilities" className="text-foreground/80 hover:text-foreground transition-colors">Возможности</a>
            <a href="#faq" className="text-foreground/80 hover:text-foreground transition-colors">FAQ</a>
            <a href="#docs" className="text-foreground/80 hover:text-foreground transition-colors">Технологии</a>
          </div>
          <Button className="rounded-full">Начать создавать</Button>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Icon name="Sparkles" size={16} className="text-primary" />
            <span className="text-sm font-medium">Fullstack разработка через общение</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in leading-tight">
            Создаю сайты как
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              настоящий разработчик
            </span>
          </h1>
          
          <p className="text-xl text-foreground/70 mb-10 max-w-2xl mx-auto animate-fade-in">
            Frontend + Backend + Database + Deploy. Работаю с React, Python, PostgreSQL. 
            Пишу код, исправляю баги, публикую в интернет — всё сам.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-scale-in">
            <Button size="lg" className="rounded-full text-lg px-8 py-6" onClick={() => {
              document.getElementById('chat-input')?.focus();
            }}>
              <Icon name="Rocket" size={20} className="mr-2" />
              Создать проект
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-lg px-8 py-6">
              <Icon name="Code" size={20} className="mr-2" />
              Посмотреть код
            </Button>
          </div>

          <div className="relative max-w-4xl mx-auto animate-float">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl rounded-full" />
            <Card className="relative border-2 shadow-2xl rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-3 flex items-center gap-2 border-b">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-sm text-foreground/60 ml-2">Юра — AI Разработчик</span>
              </div>
              <CardContent className="p-0 bg-card">
                <div className="h-[500px] flex flex-col">
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((msg, idx) => (
                      <div key={idx} className={`flex gap-3 animate-fade-in ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'assistant' && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                            <Icon name="Sparkles" size={16} className="text-white" />
                          </div>
                        )}
                        <div className={`max-w-[85%] ${msg.role === 'user' ? 'ml-auto' : ''}`}>
                          <div className={`p-4 rounded-2xl ${
                            msg.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}>
                            {msg.text}
                          </div>
                          
                          {msg.projectPreview && (
                            <Card className="mt-3 border-2 border-primary/30 overflow-hidden">
                              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 border-b flex items-center gap-2">
                                {msg.isCreating ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                    <span className="text-sm font-medium">Создаю проект...</span>
                                  </>
                                ) : (
                                  <>
                                    <Icon name="CheckCircle2" size={16} className="text-green-500" />
                                    <span className="text-sm font-medium text-green-600">Проект создан</span>
                                  </>
                                )}
                              </div>
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-lg mb-1">{msg.projectPreview.title}</h4>
                                <p className="text-sm text-foreground/70 mb-3">{msg.projectPreview.description}</p>
                                <div className="space-y-1">
                                  {msg.projectPreview.features.map((feature, i) => (
                                    <p key={i} className="text-sm text-foreground/80">{feature}</p>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-3 animate-fade-in">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <Icon name="Sparkles" size={16} className="text-white" />
                        </div>
                        <div className="bg-muted p-4 rounded-2xl">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" />
                            <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <input
                        id="chat-input"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Создай интернет-магазин с корзиной и оплатой..."
                        className="flex-1 px-4 py-3 rounded-full border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <Button 
                        onClick={handleSendMessage}
                        size="icon"
                        className="rounded-full w-12 h-12"
                      >
                        <Icon name="Send" size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="capabilities" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Мои возможности
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Полный стек разработки от идеи до публикации
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, idx) => (
              <Card 
                key={idx} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name={capability.icon as any} size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{capability.title}</h3>
                  <p className="text-foreground/70 text-sm mb-4">{capability.description}</p>
                  <div className="space-y-1">
                    {capability.examples.slice(0, 2).map((example, i) => (
                      <p key={i} className="text-xs text-foreground/50 italic">
                        "{example}"
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="docs" className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Технологии
            </h2>
            <p className="text-xl text-foreground/70">
              Современный стек для профессиональной разработки
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map((stack, idx) => (
              <Card key={idx} className="border-2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {stack.category}
                  </h3>
                  <div className="space-y-2">
                    {stack.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                        <Icon name="Check" size={14} className="text-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Частые вопросы
            </h2>
            <p className="text-xl text-foreground/70">
              Всё, что нужно знать о моих возможностях
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`}
                className="border-2 rounded-2xl px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-lg font-medium hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="border-2 border-primary/30 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-12 text-center">
              <Icon name="Terminal" size={48} className="mx-auto mb-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Работаю как настоящий разработчик
              </h2>
              <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
                Создаю компоненты, пишу backend функции, настраиваю базу данных, исправляю баги, 
                деплою в продакшн. Всё что делает fullstack-разработчик — делаю я.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">React</span>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">TypeScript</span>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">Python</span>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">PostgreSQL</span>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">Cloud Functions</span>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">Git</span>
              </div>
              <Button size="lg" className="rounded-full text-lg px-10 py-7" onClick={() => {
                document.getElementById('chat-input')?.focus();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>
                <Icon name="Sparkles" size={24} className="mr-2" />
                Создать проект бесплатно
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 border-t bg-muted/20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Sparkles" size={18} className="text-white" />
              </div>
              <span className="text-lg font-semibold">AI Ассистент</span>
            </div>
            <div className="flex gap-8 text-foreground/70">
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="#" className="hover:text-foreground transition-colors">Документация</a>
              <a href="#" className="hover:text-foreground transition-colors">Поддержка</a>
            </div>
            <p className="text-foreground/50 text-sm">
              © 2024 Fullstack AI Developer
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
