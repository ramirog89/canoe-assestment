import os
import sys

NETWORK="assestment-network"

def setup_network():
  print("Setup network..")
  os.system(f"docker network inspect {NETWORK} || docker network create {NETWORK}")


def setup(action):
  os.system(f"docker compose -f docker-compose.yml {action}")

def run(args):
  action = sys.argv[1]

  if action == "up":
    setup_network()
    setup(action="up")
  elif action == "down":
    setup(action="down")


print(f"\t\t\t INITIALIZING HOME ASSESTMENT \r\n\r\n")

run(sys.argv)
