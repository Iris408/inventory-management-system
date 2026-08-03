from fastapi.testclient import TestClient


def test_root_endpoint_returns_ok(client: TestClient) -> None:
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {
        "message": "PartsPilot API",
        "status": "ok",
    }


def test_health_endpoint_returns_ok(client: TestClient) -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}