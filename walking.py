#!/usr/bin/python

# class for walking directions 

import server.py


class Walking(Mode):
    def __init__ (self, name, display_name, base_mode, eval_function, enabled):
        super(Walking, self).__init__(self, name, display_name, base_mode, eval_function, enabled)
        