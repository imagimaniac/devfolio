# Security Configuration for PortfolioBot
# Topics that should NEVER be revealed

BLOCKED_PATTERNS = [
    # Money & Finance
    "salary",
    "compensation",
    "pay",
    "money",
    "earn",
    "earnings",
    "net worth",
    "wealth",
    "bonus",
    "stock options",
    "income",
    "revenue personal",
    "financial personal",
    "savings",
    "assets",
    "investments personal",
    "profit personal",
    "package",
    "ctc",
    "cost to company",
    
    # Personal Address
    "home address",
    "residence",
    "living at",
    "stay at",
    
    # Family
    "family",
    "spouse",
    "wife",
    "husband",
    "kids",
    "children",
    "married",
    
    # Personal Contact (beyond public)
    "personal phone",
    "private number",
]

# Redirect responses for blocked topics
# NOTE: Replace YOUR_EMAIL and YOUR_PHONE with your actual contact info
REDIRECT_RESPONSE = """That's not something I have info on - Pratik would need to share that directly.

Want to know about his professional work instead?"""

def is_blocked(question: str) -> bool:
    """Check if question contains blocked topics."""
    q = question.lower()
    for pattern in BLOCKED_PATTERNS:
        if pattern in q:
            return True
    return False

def get_redirect_response() -> str:
    """Get the redirect response for blocked topics."""
    return REDIRECT_RESPONSE
