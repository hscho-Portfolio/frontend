// 임시 mock 데이터 — 추후 DB로 대체
export type StackCategory =
  | 'Language'
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Cloud'
  | 'DevOps'
  | 'AI/Data'

export interface TechStack {
  name: string
  category: StackCategory
  icon: string // fontawesome class
  color: string
  usage?: string
}

export interface Project {
  slug: string
  title: string
  tagline: string
  status: 'In Progress' | 'Completed'
  period: string
  category: string
  featured: boolean
  thumbColor: string
  icon: string
  overview: string
  features: string[]
  stacks: TechStack[]
  architecture: string[]
  retrospective: string[]
  links: { github?: string; demo?: string }
}

export const ALL_STACKS: TechStack[] = [
  { name: 'Next.js', category: 'Frontend', icon: 'fa-brands fa-react', color: '#000000', usage: 'OS형 화면 구성과 라우팅' },
  { name: 'React', category: 'Frontend', icon: 'fa-brands fa-react', color: '#61DAFB', usage: '컴포넌트 기반 UI 구성' },
  { name: 'TypeScript', category: 'Language', icon: 'fa-solid fa-code', color: '#3178C6', usage: '타입 안전한 프론트엔드' },
  { name: 'Tailwind CSS', category: 'Frontend', icon: 'fa-solid fa-wind', color: '#06B6D4', usage: '유틸리티 기반 스타일링' },
  { name: 'FastAPI', category: 'Backend', icon: 'fa-solid fa-bolt', color: '#009688', usage: 'CMS API와 CRUD 구현' },
  { name: 'Spring Boot', category: 'Backend', icon: 'fa-solid fa-leaf', color: '#6DB33F', usage: 'Java 기반 백엔드 서비스' },
  { name: 'Python', category: 'Language', icon: 'fa-brands fa-python', color: '#3776AB', usage: '데이터 분석과 ML 모델링' },
  { name: 'PostgreSQL', category: 'Database', icon: 'fa-solid fa-database', color: '#336791', usage: '관계형 데이터 저장' },
  { name: 'MySQL', category: 'Database', icon: 'fa-solid fa-database', color: '#4479A1', usage: '서비스 데이터 저장' },
  { name: 'AWS', category: 'Cloud', icon: 'fa-brands fa-aws', color: '#FF9900', usage: '클라우드 인프라' },
  { name: 'Docker', category: 'DevOps', icon: 'fa-brands fa-docker', color: '#2496ED', usage: '컨테이너 배포' },
  { name: 'GitHub Actions', category: 'DevOps', icon: 'fa-brands fa-github', color: '#2088FF', usage: 'CI/CD 파이프라인' },
  { name: 'Scikit-learn', category: 'AI/Data', icon: 'fa-solid fa-chart-line', color: '#F7931E', usage: 'ML 모델 학습' },
  { name: 'XGBoost', category: 'AI/Data', icon: 'fa-solid fa-tree', color: '#E53935', usage: '회귀/분류 모델' },
]

const pick = (...names: string[]): TechStack[] =>
  names.map((n) => ALL_STACKS.find((s) => s.name === n)!).filter(Boolean)

export const PROJECTS: Project[] = [
  {
    slug: 'portfolio-os-cms',
    title: 'Portfolio OS CMS',
    tagline: '맥북 오프닝과 OS형 인터페이스를 가진 실무형 포트폴리오 CMS',
    status: 'In Progress',
    period: '2026.04 ~',
    category: 'Web Application',
    featured: true,
    thumbColor: 'linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#ec4899 100%)',
    icon: 'fa-solid fa-display',
    overview:
      '단순 정적 포트폴리오를 넘어, 관리자 페이지에서 프로젝트와 기술스택을 직접 관리할 수 있는 CMS형 포트폴리오를 목표로 한다. 프론트엔드는 OS형 인터랙션으로 차별화하고, 백엔드는 FastAPI와 PostgreSQL 기반으로 구성한다. 배포는 AWS 기반으로 설계해 클라우드 운영 경험을 함께 확보한다.',
    features: [
      '맥북 오프닝 인트로',
      'OS형 데스크톱 인터페이스',
      'iOS 스타일 폴더 인터랙션',
      '프로젝트 상세 창',
      '기술 스택 3D 카드',
      '관리자 로그인',
      '프로젝트 CRUD',
      '이미지 업로드',
      'AWS 배포',
    ],
    stacks: pick('Next.js', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'PostgreSQL', 'AWS', 'Docker').map(
      (s) => ({
        ...s,
        usage:
          s.name === 'Next.js'
            ? 'OS형 화면 구성, 라우팅, 프로젝트 상세 창 렌더링'
            : s.name === 'FastAPI'
            ? '관리자 CMS API, 프로젝트 CRUD, 이미지 업로드 API 구현'
            : s.name === 'PostgreSQL'
            ? '프로젝트, 기술스택, 카테고리, 관리자 데이터 저장'
            : s.name === 'AWS'
            ? 'ECS Fargate에 FastAPI 배포, S3에 정적 파일 호스팅'
            : s.name === 'Docker'
            ? '백엔드 컨테이너화 및 일관된 배포 환경 구성'
            : s.usage,
      })
    ),
    architecture: [
      '사용자',
      'CloudFront',
      'S3 Frontend',
      'ALB',
      'ECS Fargate — FastAPI',
      'RDS PostgreSQL',
      'S3 Storage',
    ],
    retrospective: [
      '단순한 포트폴리오 사이트가 아닌, 운영 가능한 제품을 만드는 데 중점을 두었다.',
      'OS형 UX는 화려하지만 접근성과 정보 전달력에서 트레이드오프가 있었고, 그 균형을 잡는 데 시간을 많이 썼다.',
      'AWS 배포 구조를 직접 설계하면서 인프라와 비용 트레이드오프에 대한 감각을 얻었다.',
    ],
    links: { github: '#', demo: '#' },
  },
  {
    slug: 'qled-ml-prediction',
    title: 'QLED Performance Prediction',
    tagline: 'QLED 소자 데이터를 활용한 CE / EQE 회귀 예측 모델',
    status: 'Completed',
    period: '2025.06 ~ 2025.09',
    category: 'Data Analysis',
    featured: true,
    thumbColor: 'linear-gradient(135deg,#0ea5e9 0%,#22d3ee 50%,#a78bfa 100%)',
    icon: 'fa-solid fa-microchip',
    overview:
      'QLED 소자의 구조 정보와 성능 데이터를 활용해, 디바이스 성능(CE, EQE)을 예측하는 회귀 모델을 구성한 프로젝트. 데이터 부족과 구조적 feature 한계 속에서, 다양한 모델 비교와 feature engineering을 통해 의미 있는 baseline을 구축했다.',
    features: [
      '소자 구조 데이터 정제',
      'feature engineering 파이프라인',
      'XGBoost / RandomForest 비교',
      'SHAP 기반 feature 중요도 분석',
      '모델 성능 리포트 자동화',
    ],
    stacks: pick('Python', 'Scikit-learn', 'XGBoost').map((s) => ({
      ...s,
      usage:
        s.name === 'Python'
          ? '데이터 전처리와 feature 엔지니어링'
          : s.name === 'XGBoost'
          ? 'CE / EQE 예측 회귀 모델 학습'
          : 'baseline 비교 및 평가 지표 계산',
    })),
    architecture: ['Raw QLED Data', 'Preprocessing', 'Feature Engineering', 'Model Training', 'Evaluation Report'],
    retrospective: [
      '데이터 수가 매우 적었기 때문에, 모델 정확도보다 feature 설계가 더 중요한 영역임을 체감했다.',
      '소자 구조 정보를 텍스트가 아닌 수치/카테고리로 변환하는 과정이 핵심이었다.',
      '향후에는 도메인 지식을 더 적극적으로 반영한 hybrid 모델 구조를 시도하고 싶다.',
    ],
    links: { github: '#' },
  },
  {
    slug: 'senior-welfare-recommender',
    title: 'Senior Welfare Recommender',
    tagline: '고령층 복지 서비스 매칭을 위한 추천 시스템',
    status: 'Completed',
    period: '2025.03 ~ 2025.06',
    category: 'AI Service',
    featured: true,
    thumbColor: 'linear-gradient(135deg,#f59e0b 0%,#ef4444 50%,#ec4899 100%)',
    icon: 'fa-solid fa-hand-holding-heart',
    overview:
      'LG DX School에서 진행한 팀 프로젝트로, 고령층 사용자가 자신에게 맞는 복지 서비스를 쉽게 찾을 수 있도록 돕는 추천 시스템을 구축했다. 사용자 특성과 서비스 메타데이터 기반의 매칭 로직을 설계했다.',
    features: [
      '사용자 프로필 입력 인터페이스',
      '복지 서비스 메타데이터 정제',
      '룰 기반 + 컨텐츠 기반 추천',
      '결과 카드형 UI 출력',
    ],
    stacks: pick('Python', 'Scikit-learn', 'FastAPI').map((s) => ({
      ...s,
      usage:
        s.name === 'Python'
          ? '추천 로직 및 데이터 처리'
          : s.name === 'FastAPI'
          ? '추천 API 서버 구현'
          : '컨텐츠 기반 유사도 계산',
    })),
    architecture: ['User Input', 'Profile Builder', 'Recommendation Engine', 'Service DB', 'Result UI'],
    retrospective: [
      '도메인이 복잡해 데이터 정의와 정제에 시간이 가장 많이 들어갔다.',
      '추천 시스템의 정량 평가가 어려운 만큼 사용자 시나리오 기반 정성 평가를 함께 도입했다.',
    ],
    links: { github: '#' },
  },
  {
    slug: 'tour-review-nlp',
    title: 'Tour Review NLP Analysis',
    tagline: '관광 리뷰 텍스트 데이터의 토픽 모델링과 감성 분석',
    status: 'Completed',
    period: '2024.09 ~ 2024.12',
    category: 'Data Analysis',
    featured: false,
    thumbColor: 'linear-gradient(135deg,#10b981 0%,#06b6d4 100%)',
    icon: 'fa-solid fa-comments',
    overview:
      '관광지 리뷰 텍스트 데이터를 활용해 LDA 기반 토픽 모델링과 감성 분석을 수행한 프로젝트. 관광지별 리뷰 패턴과 주요 불만 요소를 정량적으로 도출했다.',
    features: ['리뷰 크롤링 / 정제', 'LDA 토픽 모델링', '감성 분류 모델', '시각화 대시보드'],
    stacks: pick('Python', 'Scikit-learn'),
    architecture: ['Crawling', 'Text Cleaning', 'Topic Modeling', 'Sentiment Model', 'Dashboard'],
    retrospective: [
      '한국어 형태소 분석 단계에서 노이즈가 많아, 전처리 품질이 분석 결과를 좌우한다는 것을 체감했다.',
    ],
    links: { github: '#' },
  },
  {
    slug: 'blockchain-voting',
    title: 'Blockchain Voting Platform',
    tagline: '블록체인 기반 무결성 보장 투표 플랫폼',
    status: 'Completed',
    period: '2024.03 ~ 2024.08',
    category: 'Web Application',
    featured: false,
    thumbColor: 'linear-gradient(135deg,#1e40af 0%,#7c3aed 100%)',
    icon: 'fa-solid fa-shield-halved',
    overview:
      '투표 결과의 무결성과 투명성을 보장하기 위해 스마트 컨트랙트 기반으로 구현한 투표 플랫폼. 사용자 인증과 투표 트랜잭션 처리, 결과 집계 로직을 설계했다.',
    features: ['스마트 컨트랙트 설계', '사용자 인증', '투표 트랜잭션 기록', '실시간 집계'],
    stacks: pick('TypeScript', 'React'),
    architecture: ['User Wallet', 'Frontend dApp', 'Smart Contract', 'Blockchain Network'],
    retrospective: [
      '실제 투표 환경에서 요구되는 비밀성과 검증 가능성 사이의 트레이드오프를 깊이 고민했다.',
    ],
    links: { github: '#' },
  },
  {
    slug: 'ai-drawing',
    title: 'AI Drawing Service',
    tagline: '사용자 스케치를 기반으로 한 AI 이미지 생성 서비스',
    status: 'In Progress',
    period: '2026.02 ~',
    category: 'AI Service',
    featured: false,
    thumbColor: 'linear-gradient(135deg,#ec4899 0%,#f97316 100%)',
    icon: 'fa-solid fa-palette',
    overview:
      '사용자가 그린 간단한 스케치를 입력으로 받아, 생성형 모델이 완성된 이미지를 만들어주는 서비스. 모델 호출과 큐 기반 비동기 처리, 결과 이미지 저장 구조를 함께 다룬다.',
    features: ['스케치 입력 캔버스', '모델 호출 API', '비동기 작업 큐', '결과 이미지 저장'],
    stacks: pick('Python', 'FastAPI', 'AWS').map((s) => ({
      ...s,
      usage:
        s.name === 'AWS'
          ? 'S3 이미지 저장 및 모델 서버 호스팅'
          : s.name === 'FastAPI'
          ? '이미지 생성 요청 API'
          : '모델 추론 파이프라인',
    })),
    architecture: ['User Sketch', 'API Gateway', 'Job Queue', 'Inference Worker', 'S3 Storage'],
    retrospective: ['초기에는 동기 호출로 시작했지만 응답 시간 문제로 큐 기반 비동기 구조로 전환했다.'],
    links: { github: '#' },
  },
]

export const findProject = (slug: string) => PROJECTS.find((p) => p.slug === slug)

export const STACK_CATEGORIES: { name: StackCategory; icon: string }[] = [
  { name: 'Language', icon: 'fa-solid fa-code' },
  { name: 'Frontend', icon: 'fa-solid fa-window-maximize' },
  { name: 'Backend', icon: 'fa-solid fa-server' },
  { name: 'Database', icon: 'fa-solid fa-database' },
  { name: 'Cloud', icon: 'fa-solid fa-cloud' },
  { name: 'DevOps', icon: 'fa-solid fa-gears' },
  { name: 'AI/Data', icon: 'fa-solid fa-brain' },
]
