export default function Footer({ ongsContent }) { // Aceita a prop ongsContent (para a Home Page)
  return (
    <footer>
      {/* Renderiza a linha de ONGs APENAS se a prop for fornecida (na Home Page) */}
      {ongsContent && <p>{ongsContent}</p>} 
      <p>© 2025 Busca Lar - Todos os direitos reservados</p>
    </footer>
  );
}